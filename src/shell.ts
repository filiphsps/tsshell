import { createInterface } from 'node:readline/promises';
import { execSync, spawn } from 'node:child_process';
import { readdir, exists } from 'node:fs/promises';

import { executeCommand } from './commands';
import { parseInput } from './parse-input';
import type { State } from './state';
import { PATHS } from './constants';

let workingDirectory = process.cwd();

function createPrompt() {
    return process.env.PROMPT ?? process.env.PS1 ?? '$';
}

export const shell = async () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: `${createPrompt()} `
    });

    rl.prompt(true);

    rl.on('line', async (line) => {
        // Update the prompt.
        // TODO: We should probably listen to changes and dynamically update the prompt.
        rl.setPrompt(`${createPrompt()} `);

        let state: State = {
            cwd: workingDirectory,
            setCwd: (path) => {
                workingDirectory = path;
            },
            stdout: process.stdout,
            readline: rl
        };

        const { command, args } = parseInput(line);

        if (await executeCommand(command, args, state)) {
            return rl.prompt(true);
        }

        for (const path of PATHS) {
            try {
                if (!(await exists(path))) {
                    continue;
                }

                const executables = await readdir(path);
                for (const executable of executables) {
                    if (executable === command) {
                        // Don't use the parsed line here.
                        const result = execSync(line, {
                            cwd: state.cwd,
                            stdio: 'inherit'
                        })?.toString();

                        if (result) {
                            state.stdout.write(`${result}\n`);
                        }

                        return rl.prompt(true);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        state.stdout.write(`${command}: command not found\n`);
        rl.prompt();
    });
};

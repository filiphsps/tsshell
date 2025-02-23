import { createInterface } from 'node:readline/promises';

import { executeCommand } from './commands';
import { parseInput } from './parse-input';
import { readdir } from 'node:fs/promises';
import { execSync, spawn } from 'node:child_process';
import type { State } from './state';
import { PATHS } from './constants';

const PROMPT = process.env.PROMPT ?? process.env.PS1 ?? '$';

let workingDirectory = process.cwd();

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${PROMPT} `
});

export const shell = async () => {
    rl.prompt(true);

    rl.on('line', async (line) => {
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
            return rl.prompt();
        }

        for (const path of PATHS) {
            try {
                const executables = await readdir(path);
                for (const executable of executables) {
                    if (executable === command) {
                        // Don't use the parsed line here.
                        const result = execSync(line, {
                            cwd: state.cwd,
                            stdio: 'inherit'
                        }).toString();

                        state.stdout.write(`${result}\n`);
                        return rl.prompt();
                    }
                }
            } catch {}
        }

        state.stdout.write(`${command}: command not found\n`);
        rl.prompt();
    });
};

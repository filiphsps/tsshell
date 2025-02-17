import { createInterface } from 'node:readline/promises';

import { executeCommand } from './commands';
import { parseInput } from './parse-input';
import { readdir } from 'node:fs/promises';
import { execSync, spawn } from 'node:child_process';

const HOME = process.env.HOME ?? '';
const PATH = process.env.PATH ?? '';
const PATHS = PATH.split(':');
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
        const { command, args } = parseInput(line);

        if (
            await executeCommand(command, args, {
                directory: workingDirectory,
                readline: rl
            })
        ) {
            return rl.prompt();
        }

        for (const path of PATHS) {
            try {
                const executables = await readdir(path);
                for (const executable of executables) {
                    if (executable === command) {
                        const result = execSync(`${command} ${args.join(' ')}`, {
                            cwd: workingDirectory
                        }).toString();

                        console.log(result);
                        return rl.prompt();
                    }
                }
            } catch {}
        }

        console.log(`${command}: command not found`);
        rl.prompt();
    });
};

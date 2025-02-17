import { createInterface } from 'node:readline/promises';

import { executeCommand } from './commands';
import { parseInput } from './parse-input';

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

        if (command) {
            executeCommand(command, args);
        }

        rl.prompt();
    });
};

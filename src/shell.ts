import { createInterface } from 'node:readline/promises';

import { commands } from './commands';
import { parseInput } from './parse-input';

const HOME = process.env.HOME;
const PATH = process.env.PATH;

let workingDirectory = process.cwd();

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '$ '
});

/**
 * Execute a command.
 * @param target - The command to execute
 * @param args - The arguments to pass to the command
 */
async function executeCommand(target: string, args: string[]) {
    const command = commands.find(({ name }) => name === target);
    if (command) {
        await command.run(target, args);
        return;
    }

    console.log(`${target}: command not found`);
}

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

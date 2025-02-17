export interface Command {
    name: string;
    description: string;
    run: (command: string, args: string[]) => Promise<void>;
}

import { exit } from './exit';
import { help } from './help';
export const commands: Command[] = [exit, help];

/**
 * Execute a command.
 * @param target - The command to execute
 * @param args - The arguments to pass to the command
 */
export async function executeCommand(target: string, args: string[]) {
    const command = commands.find(({ name }) => name === target);
    if (command) {
        await command.run(target, args);
        return;
    }

    console.log(`${target}: command not found`);
}

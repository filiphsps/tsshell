export interface Command {
    name: string;
    description: string;
    run: (command: string, args: string[], state: State) => Promise<void>;
}

import type { State } from '../state';
import { cd } from './cd';
import { exit } from './exit';
import { help } from './help';
export const commands: Command[] = [cd, exit, help].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Execute a command.
 * @param target - The command to execute
 * @param args - The arguments to pass to the command
 */
export async function executeCommand(target: string, args: string[], state: State) {
    const command = commands.find(({ name }) => name === target);
    if (command) {
        await command.run(target, args, state);
        return true;
    }

    return false;
}

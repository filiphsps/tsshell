export interface Command {
    name: string;
    description: string;
    run: (command: string, args: string[]) => Promise<void>;
}

import { exit } from './exit';
import { help } from './help';
export const commands: Command[] = [exit, help];

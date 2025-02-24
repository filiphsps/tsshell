import path from 'node:path';
import { realpath } from 'node:fs/promises';

import { type Command } from '.';
import { HOME } from '../constants';

export const exportCommand: Command = {
    name: 'export',
    description: 'Export a variable',
    run: async (command, args, state) => {
        // TODO: Handle flags.

        const [name, value] = args[0].split('=');
        process.env[name] = value;
    }
};

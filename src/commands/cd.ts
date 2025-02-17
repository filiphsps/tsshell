import path from 'node:path';
import { realpath } from 'node:fs/promises';

import { type Command } from '.';
import { HOME } from '../constants';

export const cd: Command = {
    name: 'cd',
    description: 'Change the current working directory',
    run: async (command, args, state) => {
        const target = args[0];

        try {
            if (target.startsWith('/')) {
                state.setCwd(await realpath(target));
            } else if (target.startsWith('~')) {
                state.setCwd(await realpath(path.join(HOME, target.slice(1))));
            } else {
                state.setCwd(await realpath(path.join(state.cwd, target)));
            }
        } catch (error) {
            state.readline.write(`${command}: ${target}: No such file or directory\n`);
        }
    }
};

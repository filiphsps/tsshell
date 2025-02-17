import type { Command } from '.';

export const exit: Command = {
    name: 'exit',
    description: 'Exit the shell',
    run: async (command, args, state) => {
        if (args.length > 0) {
            return process.exit(Number.parseInt(args[0]));
        }

        process.exit(0);
    }
};

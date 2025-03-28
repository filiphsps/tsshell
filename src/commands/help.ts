import { commands, type Command } from '.';

export const help: Command = {
    name: 'help',
    description: 'Show available commands',
    run: async (command, args, state) => {
        state.stdout.write(`${commands.map((command) => `- ${command.name}: ${command.description}`).join('\n')}\n`);
    }
};

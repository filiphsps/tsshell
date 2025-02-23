/**
 * Parse the input line.
 * @param line - The line to parse
 * @returns The command and arguments
 */
function parseInput(line: string): { command: string; args: string[] } {
    // TODO: Rewrite this properly.
    const command = line.split(' ')[0] ?? '';
    let args: string[] = [];

    let input = line.split(' ').slice(1) ?? [];
    let current = '';
    let inQuotes = false;
    let quoteType = '';
    while (input.length > 0) {
        const part = input.shift()!;

        if (part.startsWith('"') || part.startsWith("'")) {
            inQuotes = true;
            quoteType = part[0];
            current = part.slice(1);
        } else if (inQuotes) {
            if (part.endsWith(quoteType)) {
                current += ' ' + part.slice(0, -1);
                args.push(current);
                current = '';
                inQuotes = false;
            } else {
                current += ' ' + part;
            }
        } else {
            args.push(part);
        }
    }

    if (current) {
        args.push(current);
    }

    // FIXME: This is a hack to remove empty arguments.
    args = args.filter((arg) => arg !== '');

    return {
        command,
        args
    };
}

export { parseInput };

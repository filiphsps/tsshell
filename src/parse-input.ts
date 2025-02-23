/**
 * Parse a command line string into command and arguments.
 * Handles both single and double quotes, and normalizes spaces.
 * @param line - The command line string to parse
 * @returns Object containing the command and array of arguments
 */
export function parseInput(line: string): { command: string; args: string[] } {
    const args: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    // Handle empty input
    if (!line.trim()) {
        return { command: '', args: [] };
    }

    // Iterate through each character in the input
    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        // Handle quotes (both single and double)
        if ((char === '"' || char === "'") && !inQuotes) {
            inQuotes = true;
            quoteChar = char;
            continue;
        }
        if (char === quoteChar && inQuotes) {
            inQuotes = false;
            quoteChar = '';
            continue;
        }

        // Handle spaces
        if (char === ' ' && !inQuotes) {
            if (current) {
                args.push(current);
                current = '';
            }
            continue;
        }

        // Add character to current argument
        current += char;
    }

    // Add the last argument if there is one
    if (current) {
        args.push(current);
    }

    // Extract command and remaining arguments
    const command = args.shift() || '';

    return {
        command,
        args: args
    };
}

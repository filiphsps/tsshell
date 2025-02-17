import type { Interface } from 'node:readline/promises';

export interface State {
    cwd: string;
    setCwd: (path: string) => void;
    stdout: NodeJS.WriteStream;
    readline: Interface;
}

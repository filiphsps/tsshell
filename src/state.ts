import type { Interface } from 'node:readline/promises';

export interface State {
    directory: string;
    readline: Interface;
}

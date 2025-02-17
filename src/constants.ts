export const HOME = process.env.HOME ?? '';
export const PATH = process.env.PATH ?? '';
export const PATHS = PATH.split(':').filter((p) => p);

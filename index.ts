import { shell } from './src/shell';

try {
    await shell();
} catch (error) {
    console.error(error);
}

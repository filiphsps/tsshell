import { expect, describe, it } from 'bun:test';
import { parseInput } from './parse-input';

describe('parse-input', () => {
    it('should parse basic commands', () => {
        const input = 'ls -la';
        expect(parseInput(input)).toEqual({
            command: 'ls',
            args: ['-la']
        });
    });

    it('should handle commands without arguments', () => {
        const input = 'pwd';
        expect(parseInput(input)).toEqual({
            command: 'pwd',
            args: []
        });
    });

    it('should handle multiple arguments', () => {
        const input = 'cp file1.txt file2.txt';
        expect(parseInput(input)).toEqual({
            command: 'cp',
            args: ['file1.txt', 'file2.txt']
        });
    });

    it('should handle quoted arguments', () => {
        const input = 'cp "file1.txt" "file2.txt"';
        expect(parseInput(input)).toEqual({
            command: 'cp',
            args: ['file1.txt', 'file2.txt']
        });
    });

    it('should handle single quoted arguments', () => {
        const input = "cp 'file1.txt' 'file2.txt'";
        expect(parseInput(input)).toEqual({
            command: 'cp',
            args: ['file1.txt', 'file2.txt']
        });
    });

    it('should ignore whitespace', () => {
        const input = 'cp  file1.txt  file2.txt';
        expect(parseInput(input)).toEqual({
            command: 'cp',
            args: ['file1.txt', 'file2.txt']
        });
    });
});

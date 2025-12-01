import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM doesn't have __dirname, so we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function readInput(filename: string): string {
  const filepath = path.join(__dirname, '..', filename);
  return fs.readFileSync(filepath, 'utf-8');
}

export function readLines(filename: string): string[] {
  return readInput(filename).trim().split('\n');
}

export function readNumbers(filename: string): number[] {
  return readLines(filename).map(line => parseInt(line, 10));
}
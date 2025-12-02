export function readInput(filename: string): string {
	const filepath = new URL(`../${filename}`, import.meta.url).pathname;
	return Deno.readTextFileSync(filepath);
}

export function readLines(filename: string, delimiter: string = "\n"): string[] {
	return readInput(filename).trim().split(delimiter);
}

export function readNumbers(filename: string): number[] {
	return readLines(filename).map((line) => parseInt(line, 10));
}

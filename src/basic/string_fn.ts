import {decodeBase64} from "../data";

const endsWithNumberRegex: RegExp = /\d+$/

export function endsWithNumber(input: string) {
	return input?.match(endsWithNumberRegex)?.[0] ?? '';
}

export function b64EndsWithNumber(input: string) {
	return endsWithNumber(decodeBase64(input ?? ''))
}

export async function joinAsyncIterable(iter: AsyncIterable<string>, breakChar: string = '\n'): Promise<string> {
	const exportData: string[] = [];
	for await (const str of iter) {
		exportData.push(str);
	}
	return exportData.join(breakChar);
}
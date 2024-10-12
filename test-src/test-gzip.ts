import {describe, it} from "vitest";
import {compressText, compressTextToBase64, decompressText, decompressTextFromBase64, encodeBase64} from "../src";

const console = (top as any).console;

describe('gzip', async () => {
	const txt = await fetch('/export.txt').then(r => r.text());
	it('base64', async (): Promise<void> => {
		console.log(encodeBase64(txt).length)

		const data = await compressTextToBase64(txt);
		console.log('gzip', data.length)

		const text = await decompressTextFromBase64(data);
		console.log('decompress', text)
	})
	it('txt', async (): Promise<void> => {
		console.log(new TextEncoder().encode(txt).length)

		const data = await compressText(txt);
		console.log('gzip', data.byteLength)

		const text = await decompressText(data);
		console.log('decompress', text)
	})
})
// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {base64ToBlob, BlobTypes, readBlob} from "../src";

const console = (top as any).console;

describe('data', () => {
	it('readBlob', async (): Promise<void> => {
		const base64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAwAB/eqf9yAAAAAASUVORK5CYII=';
		const blob = base64ToBlob(base64, 'image/png');
		const img = await readBlob(blob, BlobTypes.Image);
		expect(img.width).gt(0)
	})
})
// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {hashString} from "../src";
import {randomUUID} from "../src";

const console = (top as any).console;

describe('string', () => {
	it('hashString', async (): Promise<void> => {
		const s1 = await hashString('123')
		const s2 = await hashString('123')
		const s3 = await hashString('124')
		console.log([s1,s2,s3])
		expect(s1).eq(s2);
		expect(s1).not.eq(s3);
	})
	it('uuid', async (): Promise<void> => {
		const s1 = randomUUID();
		const s3 = randomUUID();
		console.log([s1,s3])
		expect(s1).not.eq(s3);
	})
})
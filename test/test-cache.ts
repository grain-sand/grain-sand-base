// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {AppCache, logJson, randomRange} from "../src";

const console = (top as any).console;

describe('cache', () => {
	it('out-err', async (): Promise<void> => {
		const cache = new AppCache<string>(100);
		expect(() => cache.put('key', 'value', 101)).throws(/101.*100/)
	})
	it('auto', async (): Promise<void> => {
		const cache = new AppCache<string>(100);

		for(let i = 0; i < 500; i++) {
			const key = `key${i}`;
			const value = `value${i}`;
			cache.put(key, value, randomRange({min: 1, max: 5}, 10));
			expect(cache.get(key)).eq(value);
			expect(cache.size).lte(cache.maxSize)
			await logJson(cache)
		}
	})
})
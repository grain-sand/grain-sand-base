// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson, wait,Timer} from "../src";

describe('timer', () => {
	it('timer', async (): Promise<void> => {
		const begin = Date.now();
		const timer = new Timer();
		await timer.wait();
		await timer.reWait();
		const t = Date.now() - begin;
		expect(t).gt(400).lt(600);
	})
	it('wait', async (): Promise<void> => {
		const min = 0.1, max = 0.5;
		const begin = Date.now();
		await wait(min, max);
		const t = (Date.now() - begin) / 1000;
		expect(t).gt(min).lt(max)
	})
})
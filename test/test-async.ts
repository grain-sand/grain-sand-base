// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {logJson, promiseResolvers, WaitCallMgr} from "../src";

const console = (top as any).console;

describe('async', () => {
	it('promiseResolvers', async (): Promise<void> => {
		expect(promiseResolvers()).property('resolve')
		expect(promiseResolvers(true)).property('resolve')
	})
	it('waitCall', async (): Promise<void> => {
		const waitCallMgr = new WaitCallMgr();
		const {id,promise} = waitCallMgr.newWaitCall();
		setTimeout(() => {
			waitCallMgr.callResult(id,5);
		},100)
		expect(await promise).eq(5)
	})
})
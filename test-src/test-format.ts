// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
// import {date, logJson} from "../src";
import {date, logJson} from "../dist";
describe('format', () => {
	it('date', async (): Promise<void> => {
		const time = new Date('Thu Oct 10 2024 19:59:33 GMT+0800');
		expect(date(time)).eq('2024-10-10 19:59:33')
		expect(date(time,'\\\\')).eq('\\')
		expect(date(time,'Y')).eq('2024')
		expect(date(time,'\\Y')).eq('Y')
		expect(date(time,'WD')).eq('周四')
	})
})
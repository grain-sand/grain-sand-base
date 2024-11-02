// noinspection ES6UnusedImports
// noinspection JSUnusedLocalSymbols

import {describe, it, expect} from "vitest";
import {date, logJson} from "../dist";
import {formatBytes} from "../dist";
describe('format', () => {
	it('date', async (): Promise<void> => {
		const time = new Date('Thu Oct 10 2024 19:59:33 GMT+0800');
		expect(date(time)).eq('2024-10-10 19:59:33')
		expect(date(time,'\\\\')).eq('\\')
		expect(date(time,'Y')).eq('2024')
		expect(date(time,'\\Y')).eq('Y')
		expect(date(time,'WD')).eq('周四')
	})
	it('formatBytes', async (): Promise<void> => {
		logJson(formatBytes(0)); // "0 B"
		logJson(formatBytes(1024)); // "1 K"
		logJson(formatBytes(1024, 'M',3)); // "0.001 M"
		logJson(formatBytes(12345678902,2,0)); // "1.15 G"
		logJson(formatBytes(1234567890123456)); // "1.10 P"
		logJson(formatBytes(1234567890123456789012)); // "1.03 Z"
	})
})
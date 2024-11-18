import {describe, it} from "vitest";
import {logJson} from "../src";
import {ToJsonContext} from "../src/json/impl/ToJsonContext";

const console = (top as any).console;

const obj: any = {
	a: 1,
	b: 2,
	c: [
		{
			name: 'abc',
			name1: 'abc',
			name2: 'abc',
		}
	],
	d: [3, 4, 5],
	e: [
		{
			'1name': 'abc',
			'na.me1': 'abc',
			name2: 'abc',
			name3: [1, 2, 3, 4],
		}
	],
};

describe('json', () => {
	it('convertToJsonArg', async (): Promise<void> => {
		console.log('test-json_helpers', new ToJsonContext([{rootData$: 'abc', space: 5}]))
		console.log('test-json_helpers', new ToJsonContext(['xyz']))
		console.log('test-json_helpers', new ToJsonContext([1,1,1]))
		console.log('test-json_helpers', new ToJsonContext([1,true]))
		console.log('test-json_helpers', new ToJsonContext([1,true,'json']))
	})
	it('toJson', async (): Promise<void> => {
		await logJson(obj,'json')
	})
	it('toJsJson', async (): Promise<void> => {
		const o2:any = {
			name: 'o22'
		}
		const o3 = {
			name: 'o33',
			o2
		}
		o2.o3 = o3
		const o = {
			name: 'a',
			a: {o2},
			b: {o2},
			o3,
			f() {
			},
			asy: {
				[Symbol.asyncIterator]: async  function* () {
					yield await new Promise<number>(resolve => setTimeout(() => resolve(1), 10));
					yield await new Promise<number>(resolve => setTimeout(() => resolve(2), 10));
					yield await new Promise<number>(resolve => setTimeout(() => resolve(), 10));
				}
			}
		}
		await logJson(o)
		await logJson(o,'json')
	})
})
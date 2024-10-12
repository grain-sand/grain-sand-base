import {isAsyncIterable, isIterable} from "../../types";

export async function readTmpData(data: Iterable<any> | AsyncIterable<any>, count: number = 30): Promise<any[]> {
	const arr: any[] = [];
	let i = 1;
	if (isIterable(data)) {
		for (const d of data as any) {
			arr.push(d);
			if (++i > count) break;
		}
	} else if (isAsyncIterable(data)) {
		for await(const d of data as any) {
			arr.push(d);
			if (++i > count) break;
		}
	}
	return arr;
}
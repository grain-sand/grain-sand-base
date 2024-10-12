import {IExportData} from "../IDataExportArg";
import {readTmpData} from "./readTmpData";

export async function checkFieldsRecord(data: IExportData): Promise<Record<any, number>> {
	if (data.fields) return fieldExclude(data.fields, data.excludeFields) as any;
	const tmpArr: any[] = await readTmpData(data.data);
	const fields = {} as any;
	let tpl: any;
	let n = 0;
	for (const obj of tmpArr) {
		const len = Object.keys(obj).length;
		if (len > n) {
			n = len;
			tpl = obj;
		}
	}
	n = 0;
	for (const key in tpl) {
		fields[key] = n++;
	}
	return fieldExclude(fields, data.excludeFields) as any;
}

export function createFieldEntries(fields: Record<any, number>): [string, number][] {
	return Object.entries(fields).sort(fieldEntriesSort);
}

function fieldExclude(record: Record<string, number>, names?: string[]): Record<string, number> {
	if(!names) return record;
	const difference: Record<string, number> = {} as any;
	const entries = Object.entries(record).sort(fieldEntriesSort);
	let i = 0;
	for (const [key] of entries) {
		if (!(names.includes(key))) {
			difference[key] = i++;
		}
	}
	return difference;
}

function fieldEntriesSort(a: [string, number], b: [string, number]): number {
	return a[1] - b[1];
}
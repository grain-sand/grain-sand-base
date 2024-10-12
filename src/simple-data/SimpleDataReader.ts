import {IRecordMeta} from "./IRecordMeta";
import {ITextReader} from "./ITextReader";
import {isString} from "../types";
import {StringTextReader} from "./StringTextReader";
import {SimpleDataTypePrefix} from "./SimpleDataExport";
import {copyObject} from "../basic";

const SpaceRegex = /^\s*$/

export type OnReadFn<T = any> = (name: string, page: T[], progress?: number, dataHeader?: IRecordMeta) => Promise<void> | void;
export type OnNamedReadFn<T = any> = (page: T[], progress?: number, dataHeader?: IRecordMeta) => Promise<void> | void;

export interface IReadRow<T> {
	name: string
	data: T
	progress: number
	meta: IRecordMeta
}


export class SimpleDataReader {

	private _textReader?: ITextReader

	constructor(dataOrReader: ITextReader|string) {
		if(isString(dataOrReader)) this._textReader = new StringTextReader(dataOrReader as string)
		else this._textReader = dataOrReader as any;
	}

	getHeader(): any {
		return JSON.parse(this._textReader!.firstLine)
	}

	getSize(): number {
		return this._textReader!.size
	}

	read<T>(targetName: string): IterableIterator<IReadRow<T>>;
	read(): IterableIterator<IReadRow<any>>;
	* read<T=any>(targetName?: string): IterableIterator<IReadRow<T>> {
		let name: string | undefined = undefined;
		let fields: [string, number][] | undefined = undefined;
		let meta: IRecordMeta | undefined = undefined;
		for (const {data, progress} of this._textReader!) {
			if(SpaceRegex.test(data)) continue;
			if (data.startsWith(SimpleDataTypePrefix)) {
				meta = JSON.parse(data.slice(SimpleDataTypePrefix.length))
				if (name && name === targetName) return;
				name = meta!.name
				fields = [];
				for (const [name, index] of Object.entries(meta!.fields)) {
					fields.push([name as string, Number(index)])
				}
				continue;
			} else if (!name || !fields || targetName && name !== targetName) {
				continue;
			}
			const lineArr = JSON.parse(`[${data}]`);
			const obj: any = meta?.defaultValues ? copyObject(meta?.defaultValues) : {};
			for (const [name, index] of fields!) {
				obj[name] = lineArr[index]
			}
			yield {
				name,
				data: obj,
				progress,
				meta: meta!
			}
		}
	}

	getAll<T=any>(targetName: string): T[] {
		const arr:T[] = [];
		for (const {data} of this.read<T>(targetName)) {
			arr.push(data)
		}
		return arr;
	}

	async pageRead(fn: OnReadFn, limit: number = 1000): Promise<void> {
		let arr: any[] = []
		const total = this._textReader!.size;
		let lastName:any,lastDataHeader:any;
		for (const {name,data, progress,meta} of this.read()) {
			arr.push(data)
			if (arr.length >= limit) {
				await fn(name, arr, progress, meta);
				arr = [];
			} else {
				lastName = name
				lastDataHeader = meta
			}
		}
		if (arr.length) await fn(lastName!, arr, total, lastDataHeader!);
	}

	async namedRead(fnRecord: Record<string, OnNamedReadFn>, limit: number = 1000): Promise<void> {
		await this.pageRead(async (name: string, page: any[], progress?: number, dataHeader?: IRecordMeta) => {
			name in fnRecord && (await fnRecord[name](page, progress!, dataHeader!))
		}, limit)
	}

	destroy() {
		try {
			(this._textReader as any)?.destroy?.()
		} finally {
			delete this._textReader
		}
	}

}
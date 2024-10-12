import {describe, it} from "vitest";
import {
	exportSimpleData,
	IDataExportArg,
	IRecordMeta,
	logJson,
	SimpleDataReader,
	StringTextReader,
	Timer,
	toPercentage
} from "../src";
import {mock} from 'mockjs'

const console = (top as any).console;

let asyData: any;

const arg: IDataExportArg = {
	header: {name: 'abc'},
	exportData: [
		asyData = {
			name: 'async',
			data: {
				[Symbol.asyncIterator]: async function* () {
					const timer = new Timer(50)
					for (let i = 0; i < 3; i++) {
						await timer.wait()
						yield* mock({
							'list|15': [{
								'id|+1': i * 15 + 1,
								'name': '@cname',
								'age|20-30': 0
							}]
						}).list
					}
				}
			} as any
		},
		{
			name: 'simple',
			data: [
				{id: 1, name: 'abc', arr: [2, 3, 4]}
			]
		},
		{
			name: 'mock',
			data: mock({
				'list|10': [{
					'id|+1': 1,
					'name': '@cname',
					'age|20-30': 0
				}]
			}).list
		},
	],
}

describe('bak', () => {
	it('test-read', async (): Promise<void> => {
		const txt = await fetch('/export.txt').then(r => r.text());
		const reader = new SimpleDataReader(new StringTextReader(txt))
		for(const {name,data, progress} of reader.read()) {
			console.log(name,progress,data)
		}
	})
	it('test-getAll', async (): Promise<void> => {
		const txt = await fetch('/export.txt').then(r => r.text());
		const reader = new SimpleDataReader(new StringTextReader(txt))
		await logJson(reader.getAll('async'))
	})
	it('test-namedRead', async (): Promise<void> => {
		const txt = await fetch('/export.txt').then(r => r.text());
		const reader = new SimpleDataReader(new StringTextReader(txt))
		console.log(reader.getHeader())
		await reader.namedRead({
			simple: async (page: any[],progress: number, header: IRecordMeta) => {
				await logJson({name:header.name,progress, page})
			},
			mock: async (page: any[],progress: number, header: IRecordMeta) => {
				await logJson({name:header.name,progress, page})
			},
			async: async (page: any[],progress: number, header: IRecordMeta) => {
				await logJson({name:header.name,progress, page})
			},
		})
	})
	it('test-page-read', async (): Promise<void> => {
		const txt = await fetch('/export.txt').then(r => r.text());
		const reader = new SimpleDataReader(new StringTextReader(txt))
		console.log(reader.getHeader())
		const total = reader.getSize();
		try {
			await reader.pageRead(async (name: string, page: any[], progress) => {
				await logJson({name, progress: toPercentage(progress / total), page})
			})
		} catch (e: any) {
			console.log(e)
		}
	})
	it('test-text-reader', async (): Promise<void> => {
		const txt = await fetch('/export.txt').then(r=>r.text());
		const reader = new StringTextReader(txt);
		console.log(reader.firstLine)
		for(const {data} of reader){
			console.log(data)
		}
	})
	it('test-export', async (): Promise<void> => {
		console.log(await exportSimpleData(arg))
	})
	it('test-arg', async (): Promise<void> => {
		const arg: IDataExportArg = {
			header: {name: 'abc'},
			exportData: [
				{
					name: 'abc',
					fields: {id: 0, name: 1},
					excludeFields: ['id'],
					data: [
						{id:1,name:'abc1',age:331},
						{id:2,name:'abc2',age:332},
						{id:3,name:'abc3',age:333},
					]
				},
			],
		}
		console.log(await exportSimpleData(arg))
		// await logJson(arg,50)
	})
})
import {IExportMeta} from "./IRecordMeta";

export interface IExportData<T = any, K extends keyof T = keyof T | any> extends IExportMeta {

	fields?: Record<K, number>

	defaultValues?: Record<K, any>

	excludeFields?: K[]

	data: Iterable<T> | AsyncIterable<T>

}

export interface IDataExportArg {

	header: any

	exportData: IExportData[]

}
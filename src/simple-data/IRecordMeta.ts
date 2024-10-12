
export interface IExportMeta {

	readonly name: string

	description?: string

	extraData?: any

}

export interface IRecordMeta extends IExportMeta {

	fields: Record<string, number>

	defaultValues?: Record<string, any>

}
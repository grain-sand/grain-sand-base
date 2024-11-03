export interface ITextRow {
	readonly data: string
	readonly progress: number
}

export interface ITextReader extends Iterable<ITextRow> {

	readonly contentIncludeFirstLine: boolean

	readonly lineBreakChar: string

	readonly firstLine: string

	readonly size: number

}
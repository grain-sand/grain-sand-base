export type ToJsonType = 'js' | 'json'

export interface IToJsonArg {
	rootData$: any
	space?: number
	showFn?: boolean,
	spaceEffectiveLength?: number,
	out?: Function | null,
	type: ToJsonType,
	ignoreCircularRef?: boolean
}
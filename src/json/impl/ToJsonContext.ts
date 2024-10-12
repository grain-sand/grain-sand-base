import {IToJsonArg, ToJsonType} from "../IToJsonArg";
import {isBoolean, isFunction, isNumber, isObject, isString} from "../../types";

export class ToJsonContext implements Required<IToJsonArg> {

	rootData$!: any
	space!: number
	showFn!: boolean
	spaceEffectiveLength!: number
	out!: Function | null
	type!: ToJsonType
	ignoreCircularRef!: boolean;

	constructor(args: any[]) {
		let i = 0;
		if ((isObject(args[i]) && args[i].rootData$)) Object.assign(this as any, args[i++])
		i < 1 && (this.rootData$ = args[i++])
		const lastArgs = args.slice(i)
		const numbers = lastArgs.filter(n => isNumber(n));
		// @ts-ignore
		(this.out === undefined) && (this.out = lastArgs.find(f => isFunction(f)) || null);
		// @ts-ignore
		(this.showFn === undefined) && (this.showFn = !!lastArgs.find(s => isBoolean(s)));
		// @ts-ignore
		(this.spaceEffectiveLength === undefined) && (this.spaceEffectiveLength = numbers[0] || 100);
		// @ts-ignore
		(this.space === undefined) && (this.space = numbers[1] || 2);
		// @ts-ignore
		(this.type === undefined) && (this.type = lastArgs.find(s => isString(s)) || 'js');
		// @ts-ignore
		this.ignoreCircularRef === undefined && (this.ignoreCircularRef = true)
	}

	destroy() {
		this.out = null
		this.rootData$ = null
	}

}
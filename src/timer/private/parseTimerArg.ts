import {isNumber, isObject} from "../../types";
import {IRandomRange} from "../../basic";

export interface ITimerArg {
	timeout?: number;
	range?: IRandomRange;
	multiplier?: number;
}

export function parseTimerArg(...args: any[]): ITimerArg {
	if (args.length === 0) return {timeout: 200}
	if (args.length === 1 && isNumber(args[0])) {
		return {timeout: args[0]};
	}
	const range = isObject(args[0]) ? args[0] : {min: args[0], max: args[1]};
	isNumber(range.min) || (range.min = 0);
	isNumber(range.max) || (range.max = range.min * 2);
	const multiplier = isNumber(args[2]) ? args[2] : 1000;
	return {range, multiplier};
}
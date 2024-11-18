import {IRandomRange, randomRange} from "../basic";
import {isNumber} from "../types";
import {parseTimerArg} from "./private/parseTimerArg";

/**
 * 默认为等待200毫秒
 */
export function wait(): Promise<void>;

/**
 * @param timeout 超时毫秒数
 */
export function wait(timeout: number): Promise<void>;

export function wait(range: IRandomRange, multiplier?: number): Promise<void>;

export function wait(min: number, max: number, multiplier?: number): Promise<void>;
export function wait(...args: any[]): Promise<void> {
	const {timeout, range, multiplier} = parseTimerArg(...args);
	return new Promise<void>(resolve => setTimeout(resolve, isNumber(timeout) ? timeout! : randomRange(range!, multiplier)));
}
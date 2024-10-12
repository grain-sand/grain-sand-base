import {IRandomRange, randomRange} from "../basic";
import {parseTimerArg} from "./private/parseTimerArg";
import {isNumber} from "../types";

export class Timer {

	private readonly timeout: number | IRandomRange;
	private readonly multiplier!: number;
	private timerId: any = 0;

	/**
	 *
	 * @param timeout 默认为200毫秒
	 */
	constructor(timeout?: number);

	constructor(range: IRandomRange, multiplier?: number);

	constructor(min: number, max: number, multiplier?: number);
	constructor(...args: any[]) {
		const {timeout, range, multiplier} = parseTimerArg(...args);
		this.timeout = range || timeout || 200;
		this.multiplier = multiplier!;
	}


	/**
	 * 使用默认值
	 */
	wait(): Promise<void>;

	/**
	 * @param timeout 超时毫秒数
	 */
	wait(timeout: number): Promise<void>;

	wait(range: IRandomRange, multiplier?: number): Promise<void>;

	wait(min: number, max: number, multiplier?: number): Promise<void>;
	wait(...args: any[]): Promise<void> {
		let {timeout, range, multiplier} = parseTimerArg(...args);
		if (args.length < 1) {
			range = timeout = this.timeout as any
			multiplier = this.multiplier;
		}
		return new Promise<void>(resolve => this.timerId = setTimeout(resolve, isNumber(timeout) ? timeout : randomRange(range!, multiplier)));
	}

	cancel(): void {
		clearTimeout(this.timerId)
	}


	/**
	 * 使用默认值
	 */
	reWait(): Promise<void>;

	/**
	 * @param timeout 超时毫秒数
	 */
	reWait(timeout: number): Promise<void>;

	reWait(range: IRandomRange, multiplier?: number): Promise<void>;

	reWait(min: number, max: number, multiplier?: number): Promise<void>;

	reWait(...args: any[]): Promise<void> {
		this.cancel();
		// @ts-ignore
		return this.wait(...args)
	}

}
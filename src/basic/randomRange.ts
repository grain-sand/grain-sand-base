/**
 * 随机数范围
 */
export interface IRandomRange {
	min: number
	max: number
}

/**
 * 随机数基数与增量范围
 */
export interface IRandomAddition {
	plus: number
	base: number
}

/**
 * 根据范围边界计算随机数基数与增量范围
 * @param orig
 * @param multiplier 需要乘以的倍数, 默认为1000
 */
export function randomAddition(orig: IRandomRange, multiplier?: number): IRandomAddition;
export function randomAddition({min, max}: IRandomRange, multiplier?: number): IRandomAddition {
	multiplier || (multiplier=1000)
	const base: number = min * multiplier;
	const plus: number = max > min ? (max - min) * multiplier : max * multiplier;
	return {base, plus}
}

/**
 * 根据参数生成一个指定范围的随机数
 * @param orig
 * @param multiplier 需要乘以的倍数, 默认为1000
 */
export function randomRange(orig: IRandomRange, multiplier: number = 1000): number {
	const {base, plus}: IRandomAddition = randomAddition(orig, multiplier);
	return base + Math.round(Math.random() * plus);
}
import {AsyncAnyFn, AsyncMirrorFn, MirrorFn, Predicate} from "../types";

/**
 * 判断2数组是否相交
 * @param arr1
 * @param arr2
 */
export function intersectArrays<T>(arr1: T[], arr2?: T[]): T[] {
	if (!arr2?.length) {
		return arr1;
	}
	return arr1.filter(item => arr2.includes(item));
}

/**
 *  从arr1中排除arr2
 * @param arr1
 * @param arr2
 */
export function arrayDifference<T>(arr1: T[], arr2?: T[]): T[] {
	if (!arr2?.length) {
		return arr1;
	}
	return arr1.filter(item => !arr2.includes(item));
}

/**
 *  从数组中移除满足条件的元素
 * @param array
 * @param predicate
 */
export function removeFromArray<T = any>(array: Array<T>, predicate: Predicate<T>) {
	for (let i = array.length - 1; i >= 0; i--) {
		if (predicate(array[i])) {
			array.splice(i, 1);
		}
	}
}

/**
 * 批量调用对象方法
 * @param fnKey
 * @param arrays
 * @param args
 */
export function callMethodOnObjects<FnKey extends string, Obj extends { [key in FnKey]: Function }>(
	fnKey: FnKey,
	arrays: Obj[][],
	args?: any[]
) {
	for (const array of arrays) {
		if (array && array.length) for (const obj of array) {
			obj[fnKey](...(args || []));
		}
	}
}

/**
 * 根据ID过滤数组中重复的元素
 * @param arrays
 */
export function filterUniqueById<T extends { id: string }>(...arrays: T[][]): Array<T> {
	const tmp: Record<string, T> = {};
	for (const array of arrays) {
		for (const item of array) {
			if (!(item.id in tmp)) {
				tmp[item.id] = item;
			}
		}
	}
	return Object.values(tmp);
}

/**
 * 判断2数组是否相等，忽略顺序
 * @param arr1
 * @param arr2
 */
export function arraysEqualIgnoreOrder(arr1: any[], arr2: any[]): boolean {
	if (arr1 === arr2) {
		return true;
	}
	if (arr1.length !== arr2.length) {
		return false;
	}

	// Sort both arrays
	const sortedArr1 = arr1.slice().sort();
	const sortedArr2 = arr2.slice().sort();

	// Compare sorted arrays
	for (let i = 0; i < sortedArr1.length; i++) {
		if (sortedArr1[i] !== sortedArr2[i]) {
			return false;
		}
	}

	return true;
}

/**
 * 替换数组中的每一个元素
 * @param values
 * @param fn
 */
export function arrayReplace<T>(values: T[], fn: MirrorFn<T>): T[] {
	for (let i = 0; i < values.length; i++) {
		values[i] = fn(values[i]);
	}
	return values;
}

/**
 * 异步替换数组中的每一个元素
 * @param values
 * @param fn
 */
export async function arrayAsyncReplace<T>(values: T[], fn: AsyncMirrorFn<T>): Promise<T[]> {
	for (let i = 0; i < values.length; i++) {
		values[i] = await fn(values[i]);
	}
	return values;
}

/**
 * 异步遍历数组
 * @param values
 * @param fn
 */
export async function asyncForEach<T>(values: T[], fn: AsyncAnyFn<T>): Promise<void> {
	for (let i = 0; i < values.length; i++) {
		await fn(values[i]);
	}
}
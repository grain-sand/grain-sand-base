/**
 * 获取两个对象的差集
 * @param record1
 * @param record2
 */
export function recordDifference<T extends Record<string, any>>(record1: T, record2?: T): Partial<T> {
	if(!record2) return record1;
	const difference: Partial<T> = {} as any;
	for (const key in record1) {
		if (!(key in record2)) {
			difference[key] = record1[key];
		}
	}
	return difference;
}

/**
 * 排除对象的指定字段生生成一个新对象
 * @param record
 * @param excludeNames 需要排除的字段名称,如果为空或空数组将返回原始对象
 */
export function recordExclude<T extends Record<string, any>>(record: T, excludeNames?: string[]): Partial<T> {
	if(!excludeNames?.length) return record;
	const difference: Partial<T> = {} as any;
	for (const key in record) {
		if (!(excludeNames.includes(key))) {
			difference[key] = record[key];
		}
	}
	return difference;
}

/**
 * 调换对象的键值
 * @param obj
 */
export function invertRecordKv<T extends Record<string, string | number>>(obj: T): Record<string, string> {
	const inverted: Record<string, keyof T> = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			inverted[obj[key] as string] = key;
		}
	}
	return inverted as any;
}

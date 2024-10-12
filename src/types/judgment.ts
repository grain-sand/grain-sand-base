/**
 * 是否为函数
 * @param value
 */
export function isFunction(value: any): boolean {
	return value instanceof Function
		|| typeof value === "function";
}

/**
 * 是否为异步函数
 * @param value
 */
export function isAsyncFunction(value:any):boolean {
	return value?.constructor?.name === 'AsyncFunction';
}

/**
 * 是否为数组
 * @param value
 */
export function isArray(value: any): boolean {
	return Array.isArray(value)
		|| value instanceof Array
		|| value?.constructor === Array
}

/**
 * 是否为Boolean类型
 * @param value
 */
export function isBoolean(value: any) {
	return value === true
		|| value === false
		|| value instanceof Boolean
		|| typeof value === "boolean"
}

/**
 * 是否为数字类型
 * @param value
 */
export function isNumber(value: any): boolean {
	return typeof value === "number"
		|| value instanceof Number
}

/**
 * 是否为字符串类型
 * @param value
 */
export function isString(value: any): boolean {
	return typeof value === "string"
		|| value instanceof String
}

/**
 * 是否为字符串或数字
 * @param value
 */
export function isStrOrNum(value: any): boolean {
	return typeof value === "string"
		|| typeof value === "number"
		|| value instanceof String
		|| value instanceof Number
}

/**
 * 是否为字符串或数字组成的数组
 * @param value
 */
export function isStrOrNumArr(value: any): boolean {
	return isArray(value)
		&& value.every(isStrOrNum)
}

/**
 * 是否为普通对象(非函数,非数组)
 * @param value
 */
export function isObject(value: any): boolean {
	return value && !isArray(value) && !isFunction(value) && (
		value instanceof Object
		|| typeof value === "object"
	)
}

/**
 * 是否为异步对象
 * @param variable
 */
export function isAsync(variable: any): boolean {
	if(!variable) {
		return false
	}

	if (variable instanceof Promise) {
		return true;
	}

	return isFunction(variable.then);
}

/**
 * 判断是否为同步可迭代对象的函数
 * @param obj
 */
export function isIterable(obj: any): boolean {
	return obj != null && isFunction(obj[Symbol.iterator]);
}

/**
 * 判断是否为异步可迭代对象的函数
 * @param obj
 */
export function isAsyncIterable(obj: any): boolean {
	return obj != null && isFunction(obj[Symbol.asyncIterator])
}

/**
 * 判断是否为替代器
 * @param obj
 */
export function isIterator(obj: any): boolean {
	return obj != null && typeof obj.next === 'function';
}
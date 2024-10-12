/**
 * 深度拷贝一个对象
 * @param value
 */
export function copyObject<T>(value: T): T {
	if (typeof value !== 'object' || value === null) {
		return value
	}
	if (value instanceof Date || value instanceof Function || value instanceof RegExp) {
		return value;
	}
	if (typeof Element !== 'undefined' && value instanceof Element) {
		return value
	}
	if (value instanceof Set) {
		const set = new Set<any>()
		for (const v of value) {
			set.add(copyObject(v))
		}
		return set as T;
	}
	if (value instanceof Map) {
		const map = new Map()
		for (const [k, v] of value) {
			map.set(copyObject(k), copyObject(v))
		}
		return map as T;
	}
	if (Array.isArray(value)) {
		const arr = []
		for (const v of value) {
			arr.push(copyObject(v))
		}
		return arr as T;
	}
	const obj: Record<string, any> = {};
	for (const [k, v] of Object.entries(value)) {
		obj[k] = copyObject(v)
	}
	return obj as T;
}

/**
 * 拷贝对象上指定的字段
 * @param dist
 * @param src
 * @param fields 字段列表；如果未指定将所有字段
 */
export function copyFields<T extends object>(dist: any, src: T, fields?: string[]): T {
	if (fields?.length) {
		for (const field of fields) {
			if (src.hasOwnProperty(field)) {
				// @ts-ignore
				dist[field] = src[field];
			}
		}
	} else {
		// @ts-ignore
		Object.assign(dist, src);
	}
	return dist as T;
}

/**
 * 拷贝对象上非undefined的字段
 * @param dist
 * @param src
 * @param excludeFields
 */
export function copyNonUndefinedFields<T>(dist: T, src: Partial<T>, ...excludeFields: string[]): T {
	for (const field in src) {
		const value = src[field];
		if (value !== undefined && !excludeFields.includes(field)) {
			// @ts-ignore
			dist[field] = value;
		}
	}
	return dist;
}

/**
 * 混合
 * 用于实现多继承
 * @param derivedCtor 需要实现多继承的类型(必须为接口)
 * @param parent_constructors 继承的父类型(类或构造函数)
 */
export function applyMixins(derivedCtor: any, parent_constructors: any[]) {
	parent_constructors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			// noinspection TypeScriptValidateTypes
			Object.defineProperty(
				derivedCtor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
				Object.create(null)
			);
		});
	});
}
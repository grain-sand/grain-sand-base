import {IToJsonArg} from "../IToJsonArg";
import {isAsyncIterable, isFunction, isIterable, isIterator} from "../../types";

export async function createJson(value: any, cfg: IToJsonArg, refSet: Set<any>): Promise<string | undefined> {
	value = await value
	if (typeof value === 'string' || value instanceof Date) {
		return JSON.stringify(value)
	}
	if (value instanceof Function) {
		return cfg.showFn ? value.toString() : 'undefined';
	}
	if (typeof value !== 'object' || value === null) {
		return value + ''
	}
	if (value instanceof RegExp) {
		return value.toString();
	}
	if (typeof Element !== 'undefined' && value instanceof Element) {
		return 'undefined'
	}

	if (refSet.has(value)) {
		if (cfg.ignoreCircularRef) return undefined
		throw new Error('circular reference')
	}
	refSet.add(value)
	try {
		if (cfg.type === 'json') {
			return await toJsonTail(value, cfg, refSet);
		}
		return await toJsJsonTail(value, cfg, refSet)
	} finally {
		refSet.delete(value)
	}
}

async function toJsJsonTail(value: any, cfg: IToJsonArg, refSet: Set<any>): Promise<string> {
	const arr: any[] = []
	if (value instanceof Set) {
		for (const v of value) {
			if (!isFunction(v) || cfg.showFn) {
				arr.push(await createJson(v, cfg, refSet))
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `new Set([${spaceStart}${arrJoin()}${spaceEnd}])` : '[]'
	}
	if (value instanceof Map) {
		for (const [k, v] of value) {
			if (!isFunction(v) || cfg.showFn) {
				arr.push(`${objectKey(await createJson(k, cfg, refSet))}: ${await createJson(v, cfg, refSet)}`)
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `new Map(Object.entries({${spaceStart}${arrJoin()}${spaceEnd}})` : 'new Map()'
	}
	if (Array.isArray(value) || isIterable(value)) {
		for (const v of value) {
			if (!isFunction(v) || cfg.showFn) {
				arr.push(await createJson(v, cfg, refSet))
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `[${spaceStart}${arrJoin()}${spaceEnd}]` : '[]'
	}
	if (isIterator(value) || isAsyncIterable(value)) {
		for await (const v of value) {
			if (!isFunction(v) || cfg.showFn) {
				arr.push(await createJson(v, cfg, refSet))
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `[${spaceStart}${arrJoin()}${spaceEnd}]` : '[]'
	}
	for (const [k, v] of Object.entries(value)) {
		if (!isFunction(v) || cfg.showFn) {
			arr.push(`${objectKey(k)}: ${await createJson(v, cfg, refSet)}`)
		}
	}
	const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
	return arr.length ? `{${spaceStart}${arrJoin()}${spaceEnd}}` : '{}'
}

async function toJsonTail(value: any, cfg: IToJsonArg, refSet: Set<any>): Promise<string> {
	const arr: any[] = []
	if (Array.isArray(value) || value instanceof Set || (isIterable(value) && !(value instanceof Map))) {
		for (const v of value) {
			if ( v!==undefined && (!isFunction(v) || cfg.showFn )) {
				const r = await createJson(v, cfg, refSet);
				if (r !== undefined) {
					arr.push(r)
				}
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `[${spaceStart}${arrJoin()}${spaceEnd}]` : '[]'
	}
	if (isAsyncIterable(value) || isIterator(value)) {
		for await (const v of value) {
			if ( v!==undefined && (!isFunction(v) || cfg.showFn )) {
				const r = await createJson(v, cfg, refSet);
				if (r !== undefined) {
					arr.push(r)
				}
			}
		}
		const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
		return arr.length ? `[${spaceStart}${arrJoin()}${spaceEnd}]` : '[]'
	}
	let entries = value instanceof Map ? value.entries() : Object.entries(value);
	for (const [k, v] of entries) {
		if ( v!==undefined && (!isFunction(v) || cfg.showFn )) {
			const r = await createJson(v, cfg, refSet);
			if (r !== undefined) {
				arr.push(`"${k}": ${r}`)
			}
		}
	}
	const {spaceStart, spaceEnd, arrJoin} = toJsJsonStringArgs(arr, cfg)
	return arr.length ? `[${spaceStart}${arrJoin()}${spaceEnd}]` : '[]'
}


function toJsJsonStringArgs(arr: any[], cfg: IToJsonArg) {
	let space = cfg.space!
	const length = arr.reduce((acc, v) => acc + v.length, 0);
	length < cfg.spaceEffectiveLength! && (space = 0)
	const spaceStart = space ? '\n' + ''.padStart(space) : ''
	const spaceEnd = space ? '\n' : ''
	const separator = space ? '\n'.padEnd(space + 1) : ','
	const arrJoin = space ? () => arr.join(',\n').replace(/\n/g, separator) : () => arr.join(',')
	return {spaceStart, spaceEnd, arrJoin}
}

function objectKey(key: any) {
	if (/^[a-z_]+\w*$/i.test(key)) {
		return key
	}
	return `"${key}"`
}
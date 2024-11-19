import {isFunction} from "../types";

export function promiseResolvers<T=any>(useOld:boolean = false): PromiseWithResolvers<T> {
	if( !useOld && isFunction((Promise as any).withResolvers)) {
		return (Promise as any).withResolvers();
	}
	let resolve, reject,
		promise = new Promise((rs, rj) => {
			resolve = rs;
			reject = rj;
	})
	return {promise, resolve, reject} as any;
}
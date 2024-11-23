import {promiseResolvers} from "./promiseResolvers";
import {IDisposable} from "../basic";
import resolve from "@rollup/plugin-node-resolve";

export interface IWaitCallResult {
	id: number
	promise: Promise<any>
}

export interface IWaitCallItem {
	resolve: (value: any) => void
	reject: (reason: any) => void
}

export class WaitCallMgr implements IDisposable {

	#id: number = 0;

	#waitCallMap: Map<number, IWaitCallItem> = new Map();

	has(id: number): boolean {
		return this.#waitCallMap.has(id);
	}

	newWaitCall(): IWaitCallResult {
		const id = ++this.#id;
		const {promise, reject, resolve} = promiseResolvers();
		this.#waitCallMap.set(id, {resolve, reject});
		return {
			id,
			promise: promise
		}
	}

	callResult(id: number, result: any): void {
		const item = this.#waitCallMap.get(id);
		if (item) {
			item.resolve(result);
			this.#waitCallMap.delete(id);
		}
	}

	callError(id: number, error: any): void {
		const item = this.#waitCallMap.get(id);
		if (item) {
			item.reject(error);
			this.#waitCallMap.delete(id);
		}
	}

	destroy(): void {
		this.#waitCallMap.clear();
	}

}


import {IDisposable} from "../basic";

export type ValueCreator<T> = (key:string) => T;

export class NamedWeakMap<T extends object = any> implements IDisposable {

	valueCreator?: ValueCreator<T>;

	private readonly objectRefs: Record<string, WeakRef<T>> = {} as any; // 存储对象的弱引用
	constructor(valueCreator?: ValueCreator<T>) {
		this.valueCreator = valueCreator;
	}

	get(key: string): T | undefined {
		let value = this.objectRefs[key]?.deref();
		if (value) return value;
		if (this.valueCreator) this.set(key, value = this.valueCreator(key));
		return value;
	}

	set(key: string, value: T): void {
		this.objectRefs[key] = new WeakRef(value);
	}

	destroy(): void {
		for (let key in this.objectRefs) {
			if (!this.objectRefs[key]?.deref()) {
				delete this.objectRefs[key];
			}
		}
	}
}

type ICacheItem<T> = {
	value: T;
	size: number;
	lastAccess: number;
	usageCount: number;
};

/**
 * 基于应用内存的缓存
 */
export class AppCache<Value = any, Key = any> {

	/**
	 * 最大允许缓存数量
	 */
	readonly maxSize: number;

	/**
	 * 当前缓存数量
	 */
	readonly size!: number;

	/**
	 * 已经缓存条目数
	 */
	readonly count!: number;

	#cache: Map<Key, ICacheItem<Value>> = new Map();
	#size: number = 0;

	constructor(maxSize: number) {
		this.maxSize = maxSize;
		Object.defineProperty(this, 'size', {
			get: () => this.#size,
			enumerable: true
		})
		Object.defineProperty(this, 'count', {
			get: () => this.#cache.size,
			enumerable: true
		})
	}

	/**
	 * 添加或更新缓存
	 * @param key
	 * @param value
	 * @param size
	 */
	put(key: Key, value: Value, size: number): void {
		if (size > this.maxSize) {
			throw new Error(`Item size ${size} exceeds the maximum cache size of ${this.maxSize}`);
		}

		// 如果已经存在，更新值并调整大小
		if (this.#cache.has(key)) {
			const existing = this.#cache.get(key)!;
			this.#size -= existing.size;
			this.#cache.delete(key);
		}

		// 如果需要，移除最少使用的条目以腾出空间
		while (this.#size + size > this.maxSize) {
			this.#evict();
		}

		// 添加新条目
		this.#cache.set(key, {
			value,
			size,
			lastAccess: Date.now(),
			usageCount: 1,
		});
		this.#size += size;
	}

	/**
	 * 是否存在某个缓存
	 * @param key
	 */
	has(key: Key): boolean {
		return this.#cache.has(key);
	}

	/**
	 * 获取缓存项
	 * @param key
	 */
	get(key: Key): Value | undefined {
		const item = this.#cache.get(key);
		if (!item) {
			return undefined;
		}

		// 更新访问时间和使用计数
		item.lastAccess = Date.now();
		item.usageCount++;
		return item.value;
	}

	/**
	 * 移除缓存项
	 * @param key
	 */
	delete(key: Key): void {
		const item = this.#cache.get(key);
		if (item) {
			this.#size -= item.size;
			this.#cache.delete(key);
		}
	}

	/**
	 * 清空缓存
	 */
	clear(): void {
		this.#cache.clear();
		this.#size = 0;
	}

	/**
	 * 选择并移除最少使用的条目
	 * @private
	 */
	#evict(): void {
		const candidates = Array.from(this.#cache.entries())
			.sort(([_, a], [__, b]) => {
				if (a.usageCount !== b.usageCount) {
					return a.usageCount - b.usageCount;
				}
				return a.lastAccess - b.lastAccess;
			})
			.slice(0, Math.ceil(this.#cache.size * 0.2));

		const largest = candidates.reduce((prev, curr) => (curr[1].size > prev[1].size ? curr : prev));
		this.delete(largest[0]);
	}
}

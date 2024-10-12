/**
 *  将 T 中的所有属性变成可写
 */
export type Writable<T> = {
	-readonly [P in keyof T]: T[P];
};

/**
 * 将 T 中的所有属性变成只读
 */
export type ReadonlyObject<K extends keyof any, T> = {
	readonly [P in K]: T;
};

/**
 * 除 name 外其他属性可选的接口
 */
export type PartialOptional<T, K extends keyof T> = Partial<Omit<T, K>> & Pick<T, K>;

/**
 * 将部分属性变为必选
 */
export type RequiredSome<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * 将部分属性变为可选
 */
export type OptionalSome<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * 辅助类型，将某个属性变为必选
 */
export type AtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
	? Omit<T, K> & Required<Pick<T, K>>
	: never;

/**
 * 非空Record
 * @param T 值类型
 */
export type NonEmptyRecord<T> = {
	[K in keyof T]: Pick<T, K>;
}[keyof T] & Partial<T>;

/**
 * 非空数组
 */
export type NonEmptyArray<T> = [T, ...T[]];
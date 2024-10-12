export type MirrorFn<T = any> = (record: T) => T;

export type TransformFn<T = any, R = any> = (record: T) => R;

export type Action = () => void;

export type Predicate<T = any> = (item: T) => boolean;

// noinspection JSUnusedLocalSymbols
export const EmptyFn = (...args:any):any => {}
export type AsyncVoidFn<T = any> = (value: T) => Promise<void>;

export type AsyncAnyFn<T = any> = (value: T) => Promise<any | void>;

export type AsyncMirrorFn<T = any> = (value: T) => Promise<T>;

export type AsyncGenericFn<VT = any, RT = any> = (value: VT) => Promise<RT>;

export type Async2GenericFn<VT = any, VT2 = any, RT = any> = (value: VT, value2: VT2) => Promise<RT>;

export type AsyncPredicate<T = any> = (item: T) => Promise<boolean>;

// noinspection JSUnusedLocalSymbols
export const EmptyAsyncFn = async (...args:any):Promise<any> => {}

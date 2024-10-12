import {IToJsonArg, ToJsonType} from "./IToJsonArg";
import {toJson} from "./toJson";

export async function logJson(rootData: Promise<any> | any, showFn?: boolean, type?: ToJsonType, spaceEffectiveLength?: number, space?: number): Promise<void>;
export async function logJson(rootData: Promise<any> | any, type?: ToJsonType, showFn?: boolean): Promise<void>;
export async function logJson(rootData: Promise<any> | any, type?: ToJsonType, spaceEffectiveLength?: number, space?: number): Promise<void>;
export async function logJson(rootData: Promise<any> | any, spaceEffectiveLength?: number, type?: ToJsonType): Promise<void>;
export async function logJson(rootData: Promise<any> | any, spaceEffectiveLength?: number, space?: number, showFn?: boolean): Promise<void>;
export async function logJson(arg: IToJsonArg): Promise<void> ;
export async function logJson(...args: any[]): Promise<void> {
	const out = (globalThis.top as any)?.console?.log || console.log;
	args.push(out)
	// @ts-ignore
	await toJson(...args);
}
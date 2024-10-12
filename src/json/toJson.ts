import {IToJsonArg, ToJsonType} from "./IToJsonArg";
import {ToJsonContext} from "./impl/ToJsonContext";
import {createJson} from "./impl/createJson";

export async function toJson(rootData: Promise<any> | any, type?: ToJsonType, showFn?: boolean): Promise<string>;
export async function toJson(rootData: Promise<any> | any, type?: ToJsonType, spaceEffectiveLength?: number): Promise<string>;
export async function toJson(rootData: Promise<any> | any, type?: ToJsonType, space?: number, showFn?: boolean, out?: Function, spaceEffectiveLength?: number): Promise<string>;
export async function toJson(rootData: Promise<any> | any, spaceEffectiveLength?: number, type?: ToJsonType): Promise<string>;
export async function toJson(rootData: Promise<any> | any, spaceEffectiveLength?: number, space?: number, showFn?: boolean, out?: Function, type?: ToJsonType): Promise<string>;
export async function toJson(rootData: Promise<any> | any, showFn?: boolean, out?: Function, spaceEffectiveLength?: number, space?: number, type?: ToJsonType): Promise<string>;
export async function toJson(rootData: Promise<any> | any, out?: Function, showFn?: boolean, spaceEffectiveLength?: number, space?: number, type?: ToJsonType): Promise<string>;
export async function toJson(rootData: Promise<any> | any, spaceEffectiveLength?: number, space?: number, showFn?: boolean, out?: Function): Promise<string>;
export async function toJson(arg: IToJsonArg): Promise<string> ;
export async function toJson(...args: any[]): Promise<string | undefined | void> {
	const arg = new ToJsonContext(args);
	const refSet = new Set<any>();
	try {
		const result = await createJson(arg.rootData$, arg, refSet);
		if (!arg.out) return result
		arg.out!(result);
	} finally {
		refSet.clear();
		arg.destroy();
	}
}
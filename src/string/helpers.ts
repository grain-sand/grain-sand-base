const endsWithNumberRegex: RegExp = /\d+$/

let textEncoder: TextEncoder;

/**
 * 将字符串转换为 `Uint8Array`
 * @param str
 */
export function stringToUint8Array(str: string): Uint8Array {
	return (textEncoder || (textEncoder = new TextEncoder())).encode(str);
}

/**
 * 将 `ArrayBuffer` 或 `Uint8Array` 转换为十六进制字符串
 * @param buf
 */
export function bufToHexString(buf: ArrayBuffer | Uint8Array) {
	const hashArray = Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
/**
 * 使用浏览器内置API计算字符串的哈希
 * @param message
 * @param algorithm Hash算法,默认为 SHA-1
 */
export async function hashString(message: string, algorithm: AlgorithmIdentifier = 'SHA-1'): Promise<string> {
	return bufToHexString(await crypto.subtle.digest(algorithm, stringToUint8Array(message)));
}

/**
 * 是否以数字结束
 * @param input
 */
export function endsWithNumber(input: string) {
	return input?.match(endsWithNumberRegex)?.[0] ?? '';
}

/**
 * 连接异步迭代器为字符串
 * @param iter
 * @param breakChar
 */
export async function joinAsyncIterable(iter: AsyncIterable<string>, breakChar: string = '\n'): Promise<string> {
	const exportData: string[] = [];
	for await (const str of iter) {
		exportData.push(str);
	}
	return exportData.join(breakChar);
}

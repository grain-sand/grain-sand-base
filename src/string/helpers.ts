import {decodeBase64} from "../data";

const endsWithNumberRegex: RegExp = /\d+$/

export function endsWithNumber(input: string) {
	return input?.match(endsWithNumberRegex)?.[0] ?? '';
}

export function b64EndsWithNumber(input: string) {
	return endsWithNumber(decodeBase64(input ?? ''))
}

export async function joinAsyncIterable(iter: AsyncIterable<string>, breakChar: string = '\n'): Promise<string> {
	const exportData: string[] = [];
	for await (const str of iter) {
		exportData.push(str);
	}
	return exportData.join(breakChar);
}

export async function hashString(message: string, algorithm: AlgorithmIdentifier = 'SHA-256'): Promise<string> {
	// 将字符串转换为字节数组
	const encoder = new TextEncoder();
	const data = encoder.encode(message);

	// 使用 Web Crypto API 计算哈希值
	const hashBuffer = await crypto.subtle.digest(algorithm, data);

	// 将 ArrayBuffer 转换为十六进制字符串
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function randomUUID(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);

	// 设置 UUID v4 标准的特殊位
	array[6] = (array[6] & 0x0f) | 0x40; // 第 7 个字节的前 4 位设为 4
	array[8] = (array[8] & 0x3f) | 0x80; // 第 9 个字节的前 2 位设为 10

	return [...array].map((byte, i) =>
		(i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '') + byte.toString(16).padStart(2, '0')
	).join('');
}

export async function generateUUID(content: string): Promise<string> {
	// 将字符串编码为 Uint8Array
	const encoder = new TextEncoder();
	const data = encoder.encode(content);

	// 使用 SHA-1 生成哈希
	const hashBuffer = await crypto.subtle.digest('SHA-1', data);
	const hashArray = Array.from(new Uint8Array(hashBuffer));

	// 将前 16 个字节转换为 UUID 格式
	hashArray[6] = (hashArray[6] & 0x0f) | 0x50; // 设置版本号为 5
	hashArray[8] = (hashArray[8] & 0x3f) | 0x80; // 设置 variant 字段

	// 按 UUID 格式组装
	return hashArray
		.slice(0, 16)
		.map((byte, i) =>
			(i === 4 || i === 6 || i === 8 || i === 10 ? '-' : '') + byte.toString(16).padStart(2, '0')
		)
		.join('');
}
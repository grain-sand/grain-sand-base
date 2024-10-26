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
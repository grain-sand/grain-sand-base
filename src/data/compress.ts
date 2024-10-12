/**
 * 测试当前运行环境是否支持压缩
 */
export function supportsCompression(): boolean {
	// @ts-ignore
	return typeof CompressionStream !== 'undefined' && typeof DecompressionStream !== 'undefined';
}

/**
 * 压缩
 * @param data
 * @param format
 */
export async function compressData(data: ArrayBuffer | Uint8Array, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<ArrayBuffer> {
	// @ts-ignore
	const compressionStream = new CompressionStream(format);
	const writer = compressionStream.writable.getWriter();
	// noinspection ES6MissingAwait
	writer.write(data instanceof Uint8Array ? data : new Uint8Array(data));
	// noinspection ES6MissingAwait
	writer.close();
	return await new Response(compressionStream.readable).arrayBuffer();
}

/**
 *  解压
 * @param compressedData
 * @param format
 */
export async function decompressData(compressedData: ArrayBuffer | Uint8Array, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<ArrayBuffer> {
	// @ts-ignore
	const decompressionStream = new DecompressionStream(format);
	const writer = decompressionStream.writable.getWriter();
	// noinspection ES6MissingAwait
	writer.write(compressedData instanceof Uint8Array ? compressedData : new Uint8Array(compressedData));
	// noinspection ES6MissingAwait
	writer.close();

	const decompressedStream = decompressionStream.readable;
	const response = new Response(decompressedStream);
	return await response.arrayBuffer();
}

/**
 * 压缩文本
 * @param data
 * @param format
 */
export async function compressText(data: string, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<ArrayBuffer> {
	return await compressData(new TextEncoder().encode(data),format);
}

/**
 * 解压为文本
 * @param compressedData
 * @param format
 */
export async function decompressText(compressedData: ArrayBuffer | Uint8Array, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<string> {
	return new TextDecoder().decode(await decompressData(compressedData, format));
}

/**
 * 压缩后转换为base64
 * @param data
 * @param format
 */
export async function compressToBase64(data: ArrayBuffer | Uint8Array, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<string> {
	return btoa(String.fromCharCode(...new Uint8Array(await compressData(data, format))));
}

/**
 * 压缩文本为base64
 * @param data
 * @param format
 */
export async function compressTextToBase64(data: string, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<string> {
	return btoa(String.fromCharCode(...new Uint8Array(await compressText(data, format))));
}

/**
 * 从base64中解压
 * @param base64
 * @param format
 */
export async function decompressFromBase64(base64: string, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<ArrayBuffer> {
	const binaryString = atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return await decompressData(bytes, format);
}

/**
 * 从base64中解压为文本
 * @param base64
 * @param format
 */
export async function decompressTextFromBase64(base64: string, format: 'gzip' | 'deflate' | 'deflate-raw' = 'gzip'): Promise<string> {
	return new TextDecoder().decode(await decompressFromBase64(base64, format));
}
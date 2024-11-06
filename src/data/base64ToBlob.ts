import {Base64DataURL} from "./base64";

export function base64ToBlob(base64:Base64DataURL|string, mimeType: string) {
	const index = base64.indexOf(';base64,');
	if(index > -1){
		base64 = base64.slice(index+8)
	}
	// 将 base64 解码为二进制字符串
	const binaryString = atob(base64);

	// 创建一个长度为二进制字符串长度的数组
	const len = binaryString.length;
	const bytes = new Uint8Array(len);

	// 将每个字符的编码填入数组
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	// 返回一个新的 Blob 对象
	return new Blob([bytes], { type: mimeType });
}

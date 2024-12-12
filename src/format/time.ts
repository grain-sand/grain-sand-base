
/**
 * 将毫秒数格式化为 hh:mm:ss.SSS 格式。
 *
 * @param ms - 毫秒数
 * @returns 格式化后的字符串
 */
export function formatMs(ms: number): string {
	const hours = Math.floor(ms / 3600000);
	ms %= 3600000;
	const minutes = Math.floor(ms / 60000);
	ms %= 60000;
	const seconds = Math.floor(ms / 1000);
	ms %= 1000;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
}


/**
 * 将秒数格式化为 hh:mm:ss 格式。
 *
 * @param seconds - 秒数
 * @returns 格式化后的字符串
 */
export function formatSeconds(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	seconds %= 3600;
	const minutes = Math.floor(seconds / 60);
	seconds %= 60;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
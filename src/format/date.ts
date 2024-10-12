import {DateDesc} from "./private/DateDesc";

const formatRegex = /\\?([ymdhis\\]|W[dn])/ig

/**
 * Y 4位年
 * y 2位年
 * M 2位月
 * m 1位月
 * D 2位日
 * d 1位日
 * H 2位时(24小时制)
 * h 1位时
 * I 2位分
 * i 1位分
 * S 2位秒
 * s 1位秒
 * WD 中文周中日数
 * wd 英文周中日数
 * wn 数字周中日数
 * \标识 原形显示
 * @param time
 * @param format
 */
export function date(time?: number | Date | string, format: string = 'Y-M-D H:I:S'): string {
	const desc = new DateDesc(time)
	return format.replace(formatRegex, ((v) => {
		if (v.startsWith('\\')) return v.slice(1);
		const rv = desc[v];
		return rv===undefined?v:rv;
	}) as any)
}


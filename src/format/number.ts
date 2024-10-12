export const cnNumber = `零一二三四五六七八九`;

export function toPercentage(decimal: number, decimals: number = 2): string {
	return `${(decimal * 100).toFixed(decimals)}%`;
}
export function createDataLine(fields: [string, number][], obj: any): string {
	const arr: string[] = [];
	for (const [key] of fields) {
		arr.push(obj[key]);
	}
	const str = JSON.stringify(arr)
	return str.slice(1, str.length - 1);
}
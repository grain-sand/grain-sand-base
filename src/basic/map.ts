export function mapToObject(map: Map<any, any>): Record<string, any> {
	const obj = {} as Record<string, any>;
	for (const [key, value] of map.entries()) {
		obj[key] = value;
	}
	return obj;
}
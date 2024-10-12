export function getKeyByStringEnumValue(
	enumObj: { [key: string]: string },
	enumValue: string
): string | undefined {
	return Object.keys(enumObj).find(key => enumObj[key] === enumValue);
}
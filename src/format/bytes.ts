import {isNumber, isString} from "../types";

const k: number = 1024;

export const BytesUnits: readonly string[] = ['B', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'] as const;

export type BytesUnit = typeof BytesUnits[number];

export interface IBytesFormatted {
	bytes: number;
	unit: BytesUnit;
	value: number;
	decimals: number;
	stringValue: string
	formattedValue: string
}

export function formatBytes(bytes: number, decimals?: number, space?: number): IBytesFormatted;

export function formatBytes(bytes: number, unit: BytesUnit, decimals?: number, space?: number): IBytesFormatted;
export function formatBytes(bytes: number, ...args: any[]): IBytesFormatted {
	let i = 0;
	const unit: BytesUnit | undefined = isString(args[i]) ? args[i++] : undefined;
	const decimals: number = isNumber(args[i]) ? Math.max(0, args[i++]) : 2;
	const space: number = isNumber(args[i]) ? args[i++] : 1;
	const index = bytes === 0 ? 0 : unit ? BytesUnits.indexOf(unit) : Math.min(Math.floor(Math.log(bytes) / Math.log(k)), BytesUnits.length - 1);
	let value = bytes / Math.pow(k, index);
	value = decimals === 0 ? Math.round(value) : parseFloat(value.toFixed(decimals));
	let stringValue: string = `${value}`;
	const dotIndex = stringValue.indexOf('.');
	if (dotIndex === -1 && decimals > 0) {
		stringValue += '.' + '0'.repeat(decimals);
	} else {
		stringValue = stringValue.padEnd(dotIndex + decimals + 1, '0');
	}
	return new BytesFormatted(
		bytes,
		value,
		BytesUnits[index],
		decimals,
		stringValue,
		`${stringValue}${' '.repeat(space)}${BytesUnits[index]}`
	);
}

class BytesFormatted implements IBytesFormatted {

	bytes: number;
	value: number;
	unit: BytesUnit;
	decimals: number;
	stringValue: string
	formattedValue: string

	constructor(bytes: number, value: number, unit: BytesUnit, decimals: number,
	            decimalsValue: string, stringValue: string) {
		this.bytes = bytes;
		this.value = value;
		this.unit = unit;
		this.decimals = decimals;
		this.stringValue = decimalsValue;
		this.formattedValue = stringValue
	}

	toString(): string {
		return this.formattedValue;
	}

}
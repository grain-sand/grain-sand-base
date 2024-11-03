import {ITextReader, ITextRow} from "./ITextReader";

export class StringTextReader implements ITextReader {

	readonly lineBreakChar: string;
	readonly contentIncludeFirstLine: boolean;
	readonly size: number;
	private _raw?: string;
	private firstLineEnd: number = 0;

	constructor(raw: string, lineBreakChar: string = '\n', isAlwaysIncludeFirst: boolean = true) {
		this._raw = raw;
		this.lineBreakChar = lineBreakChar;
		this.contentIncludeFirstLine = isAlwaysIncludeFirst;
		this.size = raw.length;
	}

	get firstLine(): string {
		if (this.firstLineEnd === 0) {
			this.firstLineEnd = this._raw!.indexOf(this.lineBreakChar);
			if (this.firstLineEnd === -1) {
				this.firstLineEnd = this._raw!.length;
			}
		}
		return this._raw!.slice(0, this.firstLineEnd);
	}

	* [Symbol.iterator](): Iterator<ITextRow> {
		const {_raw, lineBreakChar} = this as any;
		const total = _raw.length;
		const breakCharLength = lineBreakChar.length;
		let start = this.firstLine && !this.contentIncludeFirstLine ? this.firstLineEnd + breakCharLength : 0;
		while (start < total) {
			const end = _raw.indexOf(lineBreakChar, start);
			if (end === -1) {
				yield {data: _raw.slice(start), progress: total};
				break;
			}
			yield {data: _raw.slice(start, end), progress: end};
			start = end + breakCharLength;
		}
	}

	destroy(): void {
		delete this._raw;
	}

}
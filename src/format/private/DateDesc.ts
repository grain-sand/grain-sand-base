import {cnNumber} from "../number";

const enDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const cnDaysOfWeek = cnNumber.replace('零', '日');
export class DateDesc {

	[key:string]:any

	private readonly date:Date;
	constructor(date?:number|Date|string) {
		date || (date = new Date())
		this.date = date instanceof Date ? date : new Date(date)
	}

	get Y():string {
		return `${this.date.getFullYear()}`
	}
	get y():string {
		return this.Y.slice(2)
	}
	get m():string {
		return `${this.date.getMonth()+1}`
	}
	get M():string {
		return this.m.padStart(2,'0');
	}
	get d():string {
		return `${this.date.getDate()}`
	}
	get D():string {
		return this.d.padStart(2,'0');
	}
	get h():string {
		return `${this.date.getHours()}`
	}
	get H():string {
		return this.h.padStart(2,'0');
	}
	get i():string {
		return `${this.date.getMinutes()}`
	}
	get I():string {
		return this.i.padStart(2,'0');
	}
	get s():string {
		return `${this.date.getSeconds()}`
	}
	get S():string {
		return this.s.padStart(2,'0');
	}
	get wn():number {
		return this.date.getDay();
	}
	get wd():string {
		return enDaysOfWeek[this.wn]
	}
	get WD():string {
		return `周${cnDaysOfWeek[this.wn]}`
	}

}
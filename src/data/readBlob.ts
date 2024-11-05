import {EncodingType} from "../string";
import {Base64DataURL} from "./base64";

export const enum BlobTypes {

	/**
	 * 文本类型
	 */
	Text,

	/**
	 * 已编码的Base64URL
	 */
	Base64,

	/**
	 * 将数据读入内存缓存,类型为 ArrayBuffer
	 */
	Buffer,

	/**
	 * <img>对象,类型为 HTMLImageElement
	 */
	Image,

	/**
	 * 位图,类型为 ImageBitmap
	 */
	Bitmap,

	/**
	 * Svg,类型为HTMLUnknownElement
	 */
	Svg

}


export function readBlob(blob: Blob, type: BlobTypes.Base64): Promise<Base64DataURL>;

export function readBlob(blob: Blob, type: BlobTypes.Buffer): Promise<ArrayBuffer>;

export function readBlob(blob: Blob, type: BlobTypes.Image): Promise<HTMLImageElement>;

export function readBlob(blob: Blob, type: BlobTypes.Bitmap): Promise<ImageBitmap>;

export function readBlob(blob: Blob, type: BlobTypes.Svg): Promise<HTMLUnknownElement>;

export function readBlob(blob: Blob, type: BlobTypes.Text, encoding?: EncodingType): Promise<string>;

export function readBlob(blob: Blob, type: BlobTypes, encoding: EncodingType): Promise<any> ;

export function readBlob(blob: Blob, type: BlobTypes, encoding?: EncodingType): Promise<any> {
	return new Promise(async (resolve, reject) => {
		if (type === BlobTypes.Bitmap) {
			return resolve(await globalThis.createImageBitmap(blob as Blob));
		}
		const reader = new FileReader();
		reader.onloadend = () => {
			switch (type) {
				case BlobTypes.Image:
					const image = new globalThis.Image();
					image.src = reader.result as string;
					return resolve(image);
				case BlobTypes.Svg:
					const doc = new (globalThis as any).DOMParser().parseFromString(reader.result as string, 'image/svg+xml');
					return resolve(doc.querySelector('svg'));
				default:
					resolve(reader.result)
			}
		};
		reader.onerror = reject;
		switch (type) {
			case BlobTypes.Text:
			case BlobTypes.Svg:
				reader.readAsText(blob as Blob, encoding!)
				break
			case BlobTypes.Image:
			case BlobTypes.Base64:
				reader.readAsDataURL(blob as Blob)
				break
			case BlobTypes.Buffer:
				reader.readAsArrayBuffer(blob as Blob)
				break
		}
	})
}
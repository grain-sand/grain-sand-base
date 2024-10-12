export interface IDisposable {
	destroy(): void
}

export function destroy(  obj: any): void {
	try {
		obj?.destroy?.();
	} catch (e: any) {
	}
}

export function destroyObjects(...objects: any[][]): void {
	for (const array of objects) {
		if (array?.length) {
			for (const obj of array) {
				try {
					obj?.destroy?.();
				} catch (e: any) {
				}
			}
			array.length = 0;
		}
	}
}

export function destroyRecords(...disposables: Record<string, any>[]): void {
	for (const disposable of disposables) {
		if (!disposable) continue;
		for (const key of Object.keys(disposable)) {
			try {
				disposable[key]?.destroy?.();
			} catch (e: any) {
			} finally {
				delete disposable[key];
			}
		}
	}
}
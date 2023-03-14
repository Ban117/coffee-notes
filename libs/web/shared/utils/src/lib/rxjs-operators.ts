import { MonoTypeOperatorFunction, tap } from "rxjs";

export function tapWhen<T>(
	condition: (data: T) => boolean,
	whenTrue: ((data: T) => void) | null = null,
	whenFalse: ((data: T) => void) | null = null,
): MonoTypeOperatorFunction<T> {
	return tap<T>(x => {
		if (condition(x)) {
			if (whenTrue) {
				whenTrue(x);
			}
		} else {
			if (whenFalse) {
				whenFalse(x);
			}
		}
	});
}

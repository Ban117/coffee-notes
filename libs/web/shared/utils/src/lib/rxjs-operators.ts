import { MonoTypeOperatorFunction, tap } from "rxjs";

/**
 * Tap with a condition operator.
 *
 * @param condition Condition to perform.
 * @param [whenTrue=null] Function when the condition is truthy.
 * @param [whenFalse=null] Function when the condition is falsy.
 */
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

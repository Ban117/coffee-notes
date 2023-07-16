import {
	AbstractControl,
	FormArray,
	FormGroup,
	ValidationErrors,
	ValidatorFn,
} from "@angular/forms";

interface MatcherValidatorOptions {
	validatorName: string;
	controlNames: string[];
	errorKey: string;
	mode: MatcherValidatorMode;
	caseSensitive: boolean;
}

export enum MatcherValidatorMode {
	equal = "equal",
	unique = "unique",
}

export enum ValidatorErrorKeys {
	equal = "error.validation.equal",
	unique = "error.validation.unique",
}

export function equalValidator(controlNames: string[]): ValidatorFn {
	return matcherValidator({
		validatorName: "equalValidator",
		controlNames,
		errorKey: ValidatorErrorKeys.equal,
		mode: MatcherValidatorMode.equal,
		caseSensitive: true,
	});
}

export function uniqueValidator(controlNames: string[]): ValidatorFn {
	return matcherValidator({
		validatorName: "uniqueValidator",
		controlNames,
		errorKey: ValidatorErrorKeys.unique,
		mode: MatcherValidatorMode.unique,
		caseSensitive: true,
	});
}

export function matcherValidator(
	options: MatcherValidatorOptions,
): ValidatorFn {
	const { validatorName, controlNames, errorKey, mode, caseSensitive } =
		options;

	return (control: AbstractControl): ValidationErrors | null => {
		if (
			!(control instanceof FormGroup) &&
			!(control instanceof FormArray)
		) {
			throw Error(
				`[${validatorName}] should only be used with a FormGroup or FormArray.`,
			);
		}

		let controlsToValidate =
			control instanceof FormGroup
				? controlNames.length
					? controlNames
							.map(name => control.get(name))
							.filter((x): x is AbstractControl => !!x)
					: Object.values(control.controls)
				: control.controls;

		// handle nested FromGroup/FormArray
		controlsToValidate = controlsToValidate.reduce<AbstractControl[]>(
			(result, value) => {
				if (value instanceof FormArray) {
					result.push(...value.controls);
				} else if (value instanceof FormGroup) {
					result.push(...Object.values(value.controls));
				} else {
					result.push(value);
				}
				return result;
			},
			[],
		);

		let hasError = false;

		if (mode === MatcherValidatorMode.unique) {
			controlsToValidate.forEach((item, index) => {
				const { value } = item;

				if (!value) {
					return;
				}

				const found = controlsToValidate.some((ctrl, i) =>
					index === i
						? false
						: caseSensitive
						? ctrl?.value === value
						: ctrl?.value?.toLowerCase() === value.toLowerCase(),
				);

				if (found) {
					item.setErrors({
						...item.errors,
						[errorKey]: true,
					});

					hasError = true;
					return;
				}

				item.updateValueAndValidity({ onlySelf: true });
			});
		}

		if (mode === MatcherValidatorMode.equal) {
			const existingValues: unknown[] = [];

			controlsToValidate.forEach(item => {
				const { value } = item;
				if (!value) {
					return;
				}

				// this will only set error on 2nd or later control
				if (
					existingValues.length &&
					!existingValues.includes(
						caseSensitive ? value : value.toLowerCase(),
					)
				) {
					item.setErrors({
						...item.errors,
						[errorKey]: true,
					});
					hasError = true;
					return;
				}

				item.updateValueAndValidity({ onlySelf: true });
				existingValues.push(
					caseSensitive ? value : value.toLowerCase(),
				);
			});
		}

		return hasError ? { [errorKey]: true } : null;
	};
}

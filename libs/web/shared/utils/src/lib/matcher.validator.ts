import { flattenControls } from "./forms";
import {
	AbstractControl,
	ValidationErrors,
	ValidatorFn,
	isFormArray,
	isFormGroup,
} from "@angular/forms";

interface MatcherValidatorOptions {
	validatorName: string;
	controlNames: string[];
	errorKey: string;
	mode: MatcherValidatorMode;
	caseSensitive?: boolean;
}

export enum MatcherValidatorMode {
	equal = "equal",
	unique = "unique",
}

export enum ValidatorErrorKeys {
	equal = "error.validation.equal",
	unique = "error.validation.unique",
}

export function equalValidator(...controlNames: string[]): ValidatorFn {
	return matcherValidator({
		validatorName: "equalValidator",
		controlNames,
		errorKey: ValidatorErrorKeys.equal,
		mode: MatcherValidatorMode.equal,
	});
}

export function uniqueValidator(...controlNames: string[]): ValidatorFn {
	return matcherValidator({
		validatorName: "uniqueValidator",
		controlNames,
		errorKey: ValidatorErrorKeys.unique,
		mode: MatcherValidatorMode.unique,
	});
}

export function matcherValidator({
	validatorName,
	controlNames,
	errorKey,
	mode,
	caseSensitive = true,
}: MatcherValidatorOptions): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		if (!isFormArray(control) && !isFormGroup(control)) {
			throw Error(
				`[${validatorName}] should only be used with a FormGroup or FormArray.`,
			);
		}

		let controlsToValidate = isFormGroup(control)
			? controlNames.length
				? controlNames
						.map(name => control.get(name))
						.filter((x): x is AbstractControl => !!x)
				: Object.values(control.controls)
			: control.controls;

		controlsToValidate = flattenControls(controlsToValidate);

		let hasError = false;

		if (mode === MatcherValidatorMode.unique) {
			controlsToValidate.forEach((item, index) => {
				const { value } = item;

				if (!value) {
					return;
				}

				const found = controlsToValidate.some((ctrl, i) =>
					index === i ? false : ctrl.value === value,
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

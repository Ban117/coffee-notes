import {
	FormGroup,
	FormArray,
	AbstractControl,
	isFormArray,
	isFormGroup,
} from "@angular/forms";

export function flattenControl(control: AbstractControl): AbstractControl[] {
	if (isFormGroup(control) || isFormArray(control)) {
		return getControlsFromArrayOrGroup(control).reduce<AbstractControl[]>(
			(acc, currentControl) => [
				...acc,
				...flattenControl(currentControl),
			],
			[],
		);
	} else {
		return [control];
	}
}

export function flattenControls(
	controls: AbstractControl[],
): AbstractControl[] {
	return controls.reduce<AbstractControl[]>(
		(acc, currentControl) => [...acc, ...flattenControl(currentControl)],
		[],
	);
}

export function getControlsFromArrayOrGroup<T>(
	control: FormGroup | FormArray,
): AbstractControl<T>[] {
	return control instanceof FormGroup
		? Object.values(control.controls)
		: control.controls;
}

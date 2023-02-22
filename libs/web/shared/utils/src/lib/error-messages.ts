import { FormControl } from "@angular/forms";
import { ValidatorErrorKeys } from "./matcher.validator";

export function getErrorMessage(control: FormControl): string {
	if (control.hasError("email")) {
		return "Please enter a valid email address";
	}

	if (control.hasError(ValidatorErrorKeys.equal)) {
		return "Passwords must be the same";
	}

	if (control.hasError("minlength")) {
		return "Too short";
	}

	if (control.hasError("required")) {
		return "Field is required";
	}

	return "Field error";
}

import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthActions } from "@bn/web/auth/data-access";
import { equalValidator, getErrorMessage } from "@bn/web/shared/utils";
import { Store } from "@ngxs/store";
import { catchError, EMPTY } from "rxjs";

@Component({
	selector: "bn-sign-up",
	host: { class: "bn-sign-up" },
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	readonly getError = getErrorMessage;

	readonly form = new FormGroup(
		{
			email: new FormControl("", [Validators.required, Validators.email]),
			password: new FormControl("", [
				Validators.required,
				Validators.minLength(8),
			]),
			confirmPassword: new FormControl("", [
				Validators.required,
				Validators.minLength(8),
			]),
		},
		{ validators: equalValidator(["password", "confirmPassword"]) },
	);

	get emailControl(): FormControl {
		return this.form.get("email") as FormControl;
	}

	get passwordControl(): FormControl {
		return this.form.get("password") as FormControl;
	}

	get confirmPasswordControl(): FormControl {
		return this.form.get("confirmPassword") as FormControl;
	}

	constructor(private store: Store, private snackBar: MatSnackBar) {}

	signUp() {
		// we sub here to handle catch the error, even though it'll still be caught by
		// angular's global `ErrorHandler` https://www.ngxs.io/advanced/errors#handling-errors-within-an-action
		this.store
			.dispatch(
				new AuthActions.Signup(
					this.emailControl.value,
					this.passwordControl.value,
				),
			)
			.pipe(
				catchError(err => {
					this.openSnackbar(err);
					return EMPTY;
				}),
			)
			.subscribe();
	}

	logout() {
		this.store.dispatch(new AuthActions.Logout());
	}

	private openSnackbar(message: string) {
		this.snackBar.open(message, "Dismiss", {
			horizontalPosition: "end",
			verticalPosition: "top",
		});
	}
}

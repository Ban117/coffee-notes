import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthActions } from "@bn/web/auth/data-access";
import { getErrorMessage } from "@bn/web/shared/utils";
import { Store } from "@ngxs/store";
import { catchError, EMPTY } from "rxjs";

@Component({
	selector: "bn-login",
	host: { class: "bn-login" },
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	readonly getError = getErrorMessage;

	// todo rm, debugging only
	readonly form = new FormGroup({
		email: new FormControl("bcan@gmail.com", [
			Validators.required,
			Validators.email,
		]),
		password: new FormControl("12345678", [
			Validators.required,
			Validators.minLength(8),
		]),
	});

	get emailControl(): FormControl {
		return this.form.get("email") as FormControl;
	}

	get passwordControl(): FormControl {
		return this.form.get("password") as FormControl;
	}

	constructor(private store: Store, private snackBar: MatSnackBar) {}

	login() {
		this.store
			.dispatch(
				new AuthActions.Login(
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

	private openSnackbar(message: string) {
		this.snackBar.open(message, "Dismiss", {
			horizontalPosition: "end",
			verticalPosition: "top",
		});
	}
}

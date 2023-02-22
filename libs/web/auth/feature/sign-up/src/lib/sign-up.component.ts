import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthActions } from "@bn/web/auth/data-access";
import { Store } from "@ngxs/store";
import { catchError, EMPTY } from "rxjs";

@Component({
	selector: "bn-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
	constructor(private store: Store, private snackBar: MatSnackBar) {}

	signUp() {
		// we sub here to handle catch the error, even though it'll still be caught by
		// angular's global `ErrorHandler` https://www.ngxs.io/advanced/errors#handling-errors-within-an-action
		this.store
			.dispatch(new AuthActions.Signup("testy@gmail.com", "12345678"))
			.pipe(
				catchError(err => {
					this.openSnackbar(err);
					return EMPTY;
				}),
			)
			.subscribe();
	}

	login() {
		this.store
			.dispatch(new AuthActions.Login("testy@gmail.com", "12345678"))
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
		this.snackBar.open(message, "Dismiss");
	}
}

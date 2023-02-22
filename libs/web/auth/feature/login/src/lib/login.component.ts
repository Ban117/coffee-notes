import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

// todo host
@Component({
	selector: "bn-login",
	host: { class: "bn-login" },
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
	// login() {
	// 	this.store
	// 		.dispatch(new AuthActions.Login("testy@gmail.com", "12345678"))
	// 		.pipe(
	// 			catchError(err => {
	// 				this.openSnackbar(err);
	// 				return EMPTY;
	// 			}),
	// 		)
	// 		.subscribe();
	// }
}

import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

// todo host
@Component({
	selector: "bn-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}

import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "bn-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {}

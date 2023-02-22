import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { slideInAnimation } from "@bn/web/shared/ui/animation";

@Component({
	selector: "bn-auth-container",
	host: { class: "bn-auth-container" },
	templateUrl: "./auth-container.component.html",
	styleUrls: ["./auth-container.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [slideInAnimation],
})
export class AuthContainerComponent {
	navLinks = [
		{
			label: "Login",
			link: "login",
		},
		{
			label: "Sign Up",
			link: "sign-up",
		},
	];

	constructor(private contexts: ChildrenOutletContexts) {}

	getAnimationData() {
		return this.contexts.getContext("primary")?.route?.snapshot?.data?.[
			"animation"
		];
	}
}

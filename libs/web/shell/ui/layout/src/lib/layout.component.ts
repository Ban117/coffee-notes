import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Store } from "@ngxs/store";
import { AuthActions, AuthState } from "@bn/web/auth/data-access";

@Component({
	selector: "bn-layout",
	host: { class: "bn-layout" },
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
	user$ = this.store.select(AuthState.user);

	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private store: Store,
	) {}

	// todo rm, debugging only
	logout() {
		this.store.dispatch(new AuthActions.Logout());
	}
}

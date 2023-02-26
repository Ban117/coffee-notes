import {
	Component,
	ViewEncapsulation,
	ChangeDetectionStrategy,
	OnInit,
	OnDestroy,
} from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable, Subject } from "rxjs";
import { map, shareReplay, takeUntil } from "rxjs/operators";
import { Store } from "@ngxs/store";
import { AuthActions, AuthState } from "@bn/web/auth/data-access";
import { ActivatedRoute, Router } from "@angular/router";
import { tapWhen } from "@bn/web/shared/utils";

@Component({
	selector: "bn-layout",
	host: { class: "bn-layout" },
	templateUrl: "./layout.component.html",
	styleUrls: ["./layout.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit, OnDestroy {
	isHandset$: Observable<boolean> = this.breakpointObserver
		.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay(),
		);

	user$ = this.store.select(AuthState.user);

	private readonly _destroy$ = new Subject<void>();

	constructor(
		private breakpointObserver: BreakpointObserver,
		private store: Store,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.user$
			.pipe(
				tapWhen(
					user => !!user,
					() =>
						this.router.navigate(["/home"], {
							relativeTo: this.route,
						}),
					() =>
						this.router.navigate(["/auth"], {
							relativeTo: this.route,
						}),
				),
				takeUntil(this._destroy$),
			)
			.subscribe();
	}

	// todo rm, debugging only
	logout() {
		this.store.dispatch(new AuthActions.Logout());
	}

	ngOnDestroy() {
		this._destroy$.next();
		this._destroy$.complete();
	}
}

import { inject, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, Router, CanMatchFn } from "@angular/router";
import { LayoutComponent } from "@bn/web/shell/ui/layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "@bn/shared/environments";
import { NgxsModule, Store } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { AuthActions, AuthState } from "@bn/web/auth/data-access";
import { map, switchMap } from "rxjs";

export const authGuard: CanMatchFn = () => {
	const store = inject(Store);

	return store.dispatch(new AuthActions.LoadUser()).pipe(
		switchMap(() => store.select(AuthState.user)),
		map(user => !!user || inject(Router).createUrlTree(["/auth"])),
	);
};

export const webShellRoutes: Routes = [
	{
		path: "",
		component: LayoutComponent,
		children: [
			{
				path: "",
				redirectTo: "home",
				pathMatch: "full",
			},
			{
				path: "auth",
				loadChildren: async () =>
					(await import("@bn/web/auth/feature/shell"))
						.WebAuthFeatureShellModule,
			},
			{
				path: "home",
				loadChildren: async () =>
					(await import("@bn/web/home/feature")).WebHomeModule,
				// class route guards deprecated https://angular.io/guide/deprecations#router-class-and-injection-token-guards
				canMatch: [authGuard],
			},
		],
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(webShellRoutes),
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		NgxsModule.forRoot([AuthState], {
			selectorOptions: {
				injectContainerState: false,
				suppressErrors: false,
			},
		}),
		NgxsReduxDevtoolsPluginModule.forRoot(),
		NgxsLoggerPluginModule.forRoot({}),
	],
	exports: [RouterModule],
})
export class WebShellModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "@bn/web/auth/feature/container";

// todo add routes, ngxs.forFeature stuff
export const authShellRoutes: Routes = [
	{
		path: "",
		component: AuthContainerComponent,
		children: [
			{
				path: "",
				pathMatch: "full",
				redirectTo: "login",
			},
			{
				path: "login",
				loadChildren: async () =>
					(await import("@bn/web/auth/feature/login"))
						.WebAuthLoginModule,
				data: {
					animation: "login",
				},
			},
			{
				path: "sign-up",
				loadChildren: async () =>
					(await import("@bn/web/auth/feature/sign-up"))
						.WebAuthSignUpModule,
				data: {
					animation: "sign-up",
				},
			},
		],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(authShellRoutes)],
})
export class WebAuthFeatureShellModule {}

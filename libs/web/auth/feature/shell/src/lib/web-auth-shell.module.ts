import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "@bn/web/auth/feature/container";
import { NgxsModule } from "@ngxs/store";

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
	exports: [NgxsModule],
})
export class WebAuthFeatureShellModule {}

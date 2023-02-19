import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthContainerComponent } from "@bn/web/auth/feature/container";

// todo add routes, ngxs.forFeature stuff

export const authShellRoutes: Routes = [
	{
		path: "",
		component: AuthContainerComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(authShellRoutes)],
})
export class WebAuthFeatureShellModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@bn/web/shell/ui/layout";
export const webShellRoutes: Routes = [
	{
		path: "",
		component: LayoutComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(webShellRoutes)],
	exports: [RouterModule],
})
export class WebShellModule {}

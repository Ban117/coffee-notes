import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
export const webShellRoutes: Routes = [];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(webShellRoutes)],
	exports: [RouterModule],
})
export class WebShellModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { SignUpComponent } from "./sign-up.component";

const routes: Routes = [
	{
		path: "",
		component: SignUpComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes)],
	declarations: [SignUpComponent],
	exports: [SignUpComponent],
})
export class WebAuthSignUpModule {}

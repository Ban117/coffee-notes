import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";

import { LoginComponent } from "./login.component";

const routes: Routes = [
	{
		path: "",
		component: LoginComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatSnackBarModule,
		MatButtonModule,
	],
	declarations: [LoginComponent],
	exports: [LoginComponent],
})
export class WebAuthLoginModule {}

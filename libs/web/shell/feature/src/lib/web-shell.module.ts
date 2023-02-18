import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "@bn/web/shell/ui/layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "@bn/shared/environments";

export const webShellRoutes: Routes = [
	{
		path: "",
		component: LayoutComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(webShellRoutes),
		BrowserAnimationsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
	],
	exports: [RouterModule],
})
export class WebShellModule {}

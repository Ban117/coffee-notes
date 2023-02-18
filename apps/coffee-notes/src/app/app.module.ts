import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AngularFireModule } from "@angular/fire/compat";
import { WebShellModule } from "@bn/web/shell/feature";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		WebShellModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

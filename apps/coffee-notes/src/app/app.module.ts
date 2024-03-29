import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { WebShellModule } from "@bn/web/shell/feature";

import { AppComponent } from "./app.component";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, WebShellModule],
	bootstrap: [AppComponent],
})
export class AppModule {}

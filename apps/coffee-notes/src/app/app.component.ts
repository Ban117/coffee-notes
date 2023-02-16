import { Component } from "@angular/core";
import { environment } from "../environments/environment";

@Component({
	selector: "bn-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "coffee-notes";
	something = environment.testing;

	constructor() {
		console.warn(">>>> this.something", this.something);
	}
}

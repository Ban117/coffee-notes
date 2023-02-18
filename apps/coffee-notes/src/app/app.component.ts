import { Component } from "@angular/core";
import { environment } from "@bn/shared/environments";

@Component({
	selector: "bn-root",
	host: { class: "bn-root" },
	template: `<router-outlet></router-outlet>`,
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "coffee-notes";
	something = environment.testing;

	constructor() {
		console.warn(">>>> this.something", this.something);
	}
}

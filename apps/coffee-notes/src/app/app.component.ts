import { Component } from "@angular/core";

@Component({
	selector: "bn-root",
	host: { class: "bn-root" },
	template: `<router-outlet></router-outlet>`,
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "coffee-notes";
}

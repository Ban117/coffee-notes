import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "bn-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}

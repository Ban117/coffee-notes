import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewEncapsulation,
} from "@angular/core";
import { Observable } from "rxjs";

@Component({
	selector: "bn-top-bar",
	host: { class: "bn-top-bar" },
	templateUrl: "./top-bar.component.html",
	styleUrls: ["./top-bar.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
	@Input() title: string | undefined;

	@Input() iconName: string | undefined;

	@Input() isHandset$: Observable<boolean> | undefined;

	@Output() readonly menuClick = new EventEmitter<void>();
}

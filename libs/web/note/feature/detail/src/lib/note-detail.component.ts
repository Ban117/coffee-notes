import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "bn-note-detail",
	host: { class: "bn-note-detail" },
	templateUrl: "./note-detail.component.html",
	styleUrls: ["./note-detail.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent {}

import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NoteService } from "@bn/web/note/data-access";

// todo base linear on whether we're in edit or create
@Component({
	selector: "bn-note-detail",
	host: { class: "bn-note-detail" },
	templateUrl: "./note-detail.component.html",
	styleUrls: ["./note-detail.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent {
	readonly noteForm = this.fb.group({
		beanDetailForm: this.fb.group({
			name: "",
			roaster: "",
			roastDate: "",
			originCountry: "",
			originRegion: "",
			altitude: 0,
			process: "",
			roastLevel: "",
		}),
		brewDetailForm: this.fb.group({
			brewMethod: "",
		}),
		tastingNotesForm: this.fb.group({
			aromas: "",
		}),
	});

	constructor(private fb: FormBuilder, private noteService: NoteService) {}

	logForm() {
		console.warn(">>>> this.beanDetailForm", this.noteForm);
	}
}

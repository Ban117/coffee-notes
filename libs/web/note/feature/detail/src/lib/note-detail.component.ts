import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { NoteService } from "@bn/web/note/data-access";
import * as _dayjs from "dayjs";

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
	readonly beanDetailForm = this.fb.group({
		name: "",
		roaster: "",
		roastDate: "",
		originCountry: "",
		originRegion: "",
		altitude: 0, // slider?
		process: "", // autocomplete
		roastLevel: "", // autocomplete
	});

	get originCountry(): FormControl<string | null> {
		return this.beanDetailForm.controls.originCountry;
	}

	constructor(private fb: FormBuilder, private noteService: NoteService) {}

	logForm() {
		console.warn(">>>> this.beanDetailForm", this.beanDetailForm);
	}

	add() {
		const day = this.beanDetailForm.controls.roastDate.value;

		const something = _dayjs(day).toDate();

		this.noteService.testCollectionAddDocument({
			boq: "testing again",
			datey: something,
		});
	}
}

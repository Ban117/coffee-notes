import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
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
		roastDate: "",
	});

	constructor(private fb: FormBuilder) {}

	logForm() {
		console.warn(">>>> this.beanDetailForm", this.beanDetailForm);

		const day = this.beanDetailForm.controls.roastDate.value;
		const something = _dayjs(day).toISOString();

		console.warn(">>>> this.beanDetailForm.iso", day, something);
	}
}

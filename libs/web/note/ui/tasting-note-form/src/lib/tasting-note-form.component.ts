import {
	ChangeDetectionStrategy,
	Component,
	Host,
	Input,
	OnInit,
	Optional,
	ViewEncapsulation,
} from "@angular/core";
import { FormGroup, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "bn-tasting-note-form",
	host: { class: "bn-tasting-note-form" },
	templateUrl: "./tasting-note-form.component.html",
	styleUrls: ["./tasting-note-form.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TastingNoteFormComponent implements OnInit {
	@Input() formGroupName!: string;

	tastingNoteForm!: FormGroup;

	constructor(
		@Host() @Optional() private parentFormGroup: FormGroupDirective,
	) {}

	ngOnInit() {
		if (!this.parentFormGroup) {
			throw new Error("Must be used with parent form!");
		}

		this.tastingNoteForm = this.parentFormGroup.control.get(
			this.formGroupName,
		) as FormGroup;
	}
}

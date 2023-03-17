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
import { BREW_METHOD } from "@bn/web/note/data-access";

@Component({
	selector: "bn-brew-note-form",
	host: { class: "bn-brew-note-form" },
	templateUrl: "./brew-note-form.component.html",
	styleUrls: ["./brew-note-form.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrewNoteFormComponent implements OnInit {
	@Input() formGroupName!: string;

	brewNoteForm!: FormGroup;

	readonly brewMethod = BREW_METHOD;

	constructor(
		@Host() @Optional() private parentFormGroup: FormGroupDirective,
	) {}

	ngOnInit() {
		if (!this.parentFormGroup) {
			throw new Error("Must be used with parent form!");
		}

		this.brewNoteForm = this.parentFormGroup.control.get(
			this.formGroupName,
		) as FormGroup;
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NoteService } from "@bn/web/note/data-access";
import * as _dayjs from "dayjs";
import { map, Observable, startWith } from "rxjs";

export interface State {
	flag: string;
	name: string;
	population: string;
}

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
	filteredStates!: Observable<State[]>;

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

	states: State[] = [
		{
			name: "Arkansas",
			population: "2.978M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
			flag: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg",
		},
		{
			name: "California",
			population: "39.14M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
			flag: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg",
		},
		{
			name: "Florida",
			population: "20.27M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
			flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg",
		},
		{
			name: "Texas",
			population: "27.47M",
			// https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
			flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg",
		},
	];

	constructor(private fb: FormBuilder, private noteService: NoteService) {}

	ngOnInit() {
		this.filteredStates =
			this.beanDetailForm.controls.originCountry.valueChanges.pipe(
				startWith(""),
				map(state =>
					state ? this._filterStates(state) : this.states.slice(),
				),
			);
	}

	private _filterStates(value: string): State[] {
		const filterValue = value.toLowerCase();

		return this.states.filter(state =>
			state.name.toLowerCase().includes(filterValue),
		);
	}

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

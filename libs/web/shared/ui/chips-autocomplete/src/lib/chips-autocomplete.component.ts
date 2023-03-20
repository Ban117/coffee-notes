import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	ViewChild,
	ViewEncapsulation,
} from "@angular/core";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { FormControl } from "@angular/forms";
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, startWith, map } from "rxjs";

@Component({
	selector: "bn-chips-autocomplete",
	host: { class: "bn-chips-autocomplete" },
	templateUrl: "./chips-autocomplete.component.html",
	styleUrls: ["./chips-autocomplete.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipsAutocompleteComponent {
	@Input() label: string | undefined;

	@Input() placeholder = "Add";

	@Input() options: string[] = [];

	@Input() chipGridCtrl = new FormControl();

	separatorKeysCodes: number[] = [ENTER, COMMA];

	inputControl = new FormControl();

	filteredOptions: Observable<string[]>;

	@ViewChild("inputEl") inputEl!: ElementRef<HTMLInputElement>;

	@ViewChild("auto") matAutocomplete!: MatAutocomplete;

	constructor() {
		this.filteredOptions = this.inputControl.valueChanges.pipe(
			startWith(null),
			map((option: string | null) =>
				option ? this._filter(option) : this.options.slice(),
			),
		);
	}

	add(event: MatChipInputEvent) {
		const input = event.chipInput.inputElement;
		const value = event.value;

		if (value.trim()) {
			const val = [...(this.chipGridCtrl.value ?? []), value];

			this.chipGridCtrl.setValue(val);
		}

		if (input) {
			input.value = "";
		}

		this.inputControl.setValue(null);
	}

	optionDisabled(option: string): boolean {
		return !!this.chipGridCtrl.getRawValue()?.includes(option);
	}

	remove(chip: string) {
		const value = this.chipGridCtrl.value ?? [];

		const index = value.indexOf(chip);

		if (index >= 0) {
			const val = [...value];
			val.splice(index, 1);
			this.chipGridCtrl.setValue(val);
		}
	}

	selected(event: MatAutocompleteSelectedEvent) {
		event.option.deselect();

		const val = [...(this.chipGridCtrl.value ?? [])];
		val.push(event.option.viewValue);
		this.chipGridCtrl.setValue(val);
		this.inputEl.nativeElement.value = "";
		this.inputControl.setValue(null);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.options.filter(
			option => option.toLowerCase().indexOf(filterValue) === 0,
		);
	}
}

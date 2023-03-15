import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { COFFEE_COUNTRIES } from "./country-autocomplete.const";

export interface Country {
	name: string;
	flag: string;
}

const ASSET_PATH = "/assets/country-autocomplete/";

@Component({
	selector: "bn-country-autocomplete",
	host: { class: "bn-country-autocomplete" },
	templateUrl: "./country-autocomplete.component.html",
	styleUrls: ["./country-autocomplete.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAutocompleteComponent implements OnInit {
	@Input() label = "";

	@Input() control!: FormControl;

	filteredcountries!: Observable<Country[]>;

	private readonly countries: Country[] = COFFEE_COUNTRIES;

	ngOnInit() {
		this.filteredcountries = this.control.valueChanges.pipe(
			startWith(""),
			map(state =>
				state ? this._filterStates(state) : this.countries.slice(),
			),
		);
	}

	getSrcPath(countryFlagCode: string) {
		return `${ASSET_PATH}${countryFlagCode}.svg`;
	}

	private _filterStates(value: string): Country[] {
		const filterValue = value.toLowerCase();

		return this.countries.filter(state =>
			state.name.toLowerCase().includes(filterValue),
		);
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import {
	COFFEE_COUNTRIES_CONTINENTS,
	ASSET_PATH,
} from "./country-autocomplete.const";

export interface Country {
	name: string;
	flag: string;
}

export interface Continent {
	name: string;
	countries: Country[];
}

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

	filteredcountries!: Observable<Continent[]>;

	countries: Continent[] = COFFEE_COUNTRIES_CONTINENTS;

	readonly assetPath = ASSET_PATH;

	ngOnInit() {
		this.filteredcountries = this.control.valueChanges.pipe(
			startWith(""),
			map(value => this._filterGroup(value || "")),
		);
	}

	getSrcPath(countryFlagCode: string) {
		return `${ASSET_PATH}${countryFlagCode}.svg`;
	}

	private _filterGroup(value: string): Continent[] {
		if (value) {
			return this.countries
				.map(group => ({
					name: group.name,
					countries: this._filter(group.countries, value),
				}))
				.filter(group => group.countries.length > 0);
		}

		return this.countries;
	}

	private _filter(countries: Country[], value: string): Country[] {
		const filterValue = value.toLowerCase();

		return countries.filter(country =>
			country.name.toLowerCase().includes(filterValue),
		);
	}
}

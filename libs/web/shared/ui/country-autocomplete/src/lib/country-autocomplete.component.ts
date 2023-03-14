import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";

@Component({
	selector: "bn-country-autocomplete",
	host: { class: "bn-country-autocomplete" },
	templateUrl: "./country-autocomplete.component.html",
	styleUrls: ["./country-autocomplete.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryAutocompleteComponent {
	public path = "/assets/country-autocomplete";
}

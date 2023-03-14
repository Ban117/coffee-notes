import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CountryAutocompleteComponent } from "./country-autocomplete.component";

@NgModule({
	imports: [CommonModule],
	declarations: [CountryAutocompleteComponent],
	exports: [CountryAutocompleteComponent],
})
export class CountryAutocompleteModule {}

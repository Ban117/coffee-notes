import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { CountryAutocompleteComponent } from "./country-autocomplete.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatFormFieldModule,
	],
	declarations: [CountryAutocompleteComponent],
	exports: [CountryAutocompleteComponent],
})
export class CountryAutocompleteModule {}

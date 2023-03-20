import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatChipsModule } from "@angular/material/chips";

import { ChipsAutocompleteComponent } from "./chips-autocomplete.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MatFormFieldModule,
		MatChipsModule,
		MatInputModule,
		MatIconModule,
		MatAutocompleteModule,
	],
	declarations: [ChipsAutocompleteComponent],
	exports: [ChipsAutocompleteComponent],
})
export class ChipsAutocompleteModule {}

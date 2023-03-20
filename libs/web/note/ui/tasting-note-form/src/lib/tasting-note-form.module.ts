import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";

import { ChipsAutocompleteModule } from "@bn/web/shared/ui/chips-autocomplete";

import { TastingNoteFormComponent } from "./tasting-note-form.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MatFormFieldModule,
		MatInputModule,
		MatChipsModule,

		ChipsAutocompleteModule,
	],
	declarations: [TastingNoteFormComponent],
	exports: [TastingNoteFormComponent],
})
export class TastingNoteFormModule {}

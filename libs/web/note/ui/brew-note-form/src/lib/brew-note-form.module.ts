import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";

import { TranslatePipeModule } from "@bn/web/shared/pipes/translate";
import { DurationSliderModule } from "@bn/web/shared/ui/duration-slider";

import { BrewNoteFormComponent } from "./brew-note-form.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MatFormFieldModule,
		MatInputModule,
		MatChipsModule,
		MatIconModule,
		MatSliderModule,

		TranslatePipeModule,
		DurationSliderModule,
	],
	declarations: [BrewNoteFormComponent],
	exports: [BrewNoteFormComponent],
})
export class BrewNoteFormModule {}

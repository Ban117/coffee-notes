import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";

import { TranslatePipeModule } from "@bn/web/shared/pipes/translate";

import { BrewNoteFormComponent } from "./brew-note-form.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MatFormFieldModule,
		MatInputModule,
		MatChipsModule,
		MatIconModule,

		TranslatePipeModule,
	],
	declarations: [BrewNoteFormComponent],
	exports: [BrewNoteFormComponent],
})
export class BrewNoteFormModule {}

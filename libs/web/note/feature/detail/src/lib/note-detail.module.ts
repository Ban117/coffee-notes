import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";

import { NoteDetailComponent } from "./note-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSliderModule } from "@angular/material/slider";
import { MatChipsModule } from "@angular/material/chips";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { RouterModule, Routes } from "@angular/router";
import { DayjsAdapter, MAT_DAYJS_DATE_FORMATS } from "@bn/web/dayjs-adapter";
import { CountryAutocompleteModule } from "@bn/web/shared/ui/country-autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { DarkenModule } from "@bn/web/shared/directives/darken";

export const noteDetailRoutes: Routes = [
	{
		path: "",
		component: NoteDetailComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		MatStepperModule,
		MatButtonModule,
		RouterModule.forChild(noteDetailRoutes),

		ReactiveFormsModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatSliderModule,
		MatChipsModule,
		MatIconModule,

		CountryAutocompleteModule,
		DarkenModule,
	],
	declarations: [NoteDetailComponent],
	exports: [NoteDetailComponent],
	providers: [
		{
			provide: DateAdapter,
			useClass: DayjsAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS },
	],
})
export class NoteDetailModule {}

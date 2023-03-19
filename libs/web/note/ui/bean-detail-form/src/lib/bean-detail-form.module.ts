import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { MatIconModule } from "@angular/material/icon";

import { DayjsAdapter, MAT_DAYJS_DATE_FORMATS } from "@bn/web/dayjs-adapter";
import { CountryAutocompleteModule } from "@bn/web/shared/ui/country-autocomplete";
import { GradientModule } from "@bn/web/shared/directives/gradient";

import { BeanDetailFormComponent } from "./bean-detail-form.component";

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,

		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatAutocompleteModule,
		MatSliderModule,
		MatChipsModule,
		MatIconModule,

		CountryAutocompleteModule,
		GradientModule,
	],
	declarations: [BeanDetailFormComponent],
	exports: [BeanDetailFormComponent],
	providers: [
		{
			provide: DateAdapter,
			useClass: DayjsAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS },
	],
})
export class BeanDetailFormModule {}

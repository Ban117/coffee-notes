import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";

import { NoteDetailComponent } from "./note-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import {
	DateAdapter,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
} from "@angular/material/core";
import { RouterModule, Routes } from "@angular/router";
import { DayjsAdapter, MAT_DAYJS_DATE_FORMATS } from "@bn/web/dayjs-adapter";
import { MatIconModule } from "@angular/material/icon";
import { BeanDetailFormModule } from "@bn/web/note/ui/bean-detail-form";

export const noteDetailRoutes: Routes = [
	{
		path: "",
		component: NoteDetailComponent,
	},
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(noteDetailRoutes),
		ReactiveFormsModule,

		MatStepperModule,
		MatButtonModule,
		MatIconModule,

		BeanDetailFormModule,
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

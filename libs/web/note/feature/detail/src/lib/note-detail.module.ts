import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";

import { NoteDetailComponent } from "./note-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { BeanDetailFormModule } from "@bn/web/note/ui/bean-detail-form";
import { BrewNoteFormModule } from "@bn/web/note/ui/brew-note-form";

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
		BrewNoteFormModule,
	],
	declarations: [NoteDetailComponent],
	exports: [NoteDetailComponent],
})
export class NoteDetailModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";

import { NoteDetailComponent } from "./note-detail.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	imports: [
		CommonModule,
		MatStepperModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	declarations: [NoteDetailComponent],
	exports: [NoteDetailComponent],
})
export class WebNoteDetailModule {}

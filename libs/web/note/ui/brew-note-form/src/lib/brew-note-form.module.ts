import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrewNoteFormComponent } from "./brew-note-form.component";

@NgModule({
	imports: [CommonModule],
	declarations: [BrewNoteFormComponent],
	exports: [BrewNoteFormComponent],
})
export class BrewNoteFormModule {}

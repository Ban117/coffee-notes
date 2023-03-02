import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NoteDetailComponent } from "@bn/web/note/feature/detail";

export const noteShellRoutes: Routes = [
	{
		path: "",
		component: NoteDetailComponent,
	},
];

// todo routes, store
@NgModule({
	imports: [CommonModule, RouterModule.forChild(noteShellRoutes)],
})
export class WebNoteShellModule {}

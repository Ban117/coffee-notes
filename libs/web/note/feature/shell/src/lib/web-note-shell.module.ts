import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

export const noteShellRoutes: Routes = [
	{
		path: "",
		loadChildren: async () =>
			(await import("@bn/web/note/feature/detail")).WebNoteDetailModule,
	},
];

// todo routes, store
@NgModule({
	imports: [CommonModule, RouterModule.forChild(noteShellRoutes)],
})
export class WebNoteShellModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TrimFilenamePipe } from "./trim-filename.pipe";

@NgModule({
	imports: [CommonModule],
	declarations: [TrimFilenamePipe],
	exports: [TrimFilenamePipe],
})
export class TrimFilenameModule {}

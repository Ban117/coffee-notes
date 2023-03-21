import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { TrimFilenameModule } from "@bn/web/shared/pipes/trim-filename";

import { UploaderComponent } from "./uploader.component";

@NgModule({
	imports: [CommonModule, TrimFilenameModule, MatIconModule, MatButtonModule],
	declarations: [UploaderComponent],
	exports: [UploaderComponent],
})
export class UploaderModule {}

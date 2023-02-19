import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";

import { AuthContainerComponent } from "./auth-container.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		BrowserAnimationsModule,
		MatCardModule,
		MatTabsModule,
	],
	declarations: [AuthContainerComponent],
	exports: [AuthContainerComponent],
})
export class WebAuthContainerModule {}

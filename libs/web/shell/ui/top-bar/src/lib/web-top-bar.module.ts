import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";

import { TopBarComponent } from "./top-bar.component";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
	],
	declarations: [TopBarComponent],
	exports: [TopBarComponent],
})
export class WebTopBarModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { TopBarModule } from "@bn/web/shell/ui/top-bar";

@NgModule({
	imports: [
		CommonModule,
		LayoutModule,
		RouterModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		TopBarModule,
	],
	declarations: [LayoutComponent],
	exports: [LayoutComponent],
})
export class WebShellUiLayoutModule {}

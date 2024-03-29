import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forChild(routes), MatIconModule],
	declarations: [HomeComponent],
	exports: [HomeComponent],
})
export class WebHomeModule {}

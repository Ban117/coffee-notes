import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DarkenDirective } from "./darken.directive";

@NgModule({
	imports: [CommonModule],
	declarations: [DarkenDirective],
	exports: [DarkenDirective],
})
export class DarkenModule {}

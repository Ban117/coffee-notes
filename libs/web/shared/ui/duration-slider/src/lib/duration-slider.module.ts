import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DurationSliderComponent } from "./duration-slider.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, MatSliderModule],
	declarations: [DurationSliderComponent],
	exports: [DurationSliderComponent],
})
export class DurationSliderModule {}

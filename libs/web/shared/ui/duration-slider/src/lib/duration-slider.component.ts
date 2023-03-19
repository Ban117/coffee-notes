import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "bn-duration-slider",
	host: { class: "bn-duration-slider" },
	templateUrl: "./duration-slider.component.html",
	styleUrls: ["./duration-slider.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationSliderComponent {
	@Input() control!: FormControl;

	/**
	 * max in seconds
	 */
	@Input() max = 1200;

	/**
	 * min in seconds
	 */
	@Input() min = 0;

	@Input() label: string | undefined;

	formatLabel(durationInSeconds: number | string): string {
		let duration: number;

		if (typeof durationInSeconds === "string") {
			duration = parseInt(durationInSeconds);
		} else {
			duration = durationInSeconds;
		}

		const minutes = Math.floor(duration / 60);
		const seconds = duration % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	}
}

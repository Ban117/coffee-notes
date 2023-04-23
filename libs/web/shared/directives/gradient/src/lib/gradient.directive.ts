import { isPlatformBrowser } from "@angular/common";
import {
	AfterViewInit,
	Directive,
	ElementRef,
	Inject,
	Input,
	NgZone,
	Optional,
	PLATFORM_ID,
	Renderer2,
} from "@angular/core";

@Directive({
	selector: "[bnGradient]",
})
export class GradientDirective implements AfterViewInit {
	@Input("bnGradient") gradientLevel!: number;

	@Input() bnGradientFactor = 50;

	@Input() bnGradientMode: "lighten" | "darken" = "darken";

	private isBrowser: boolean;

	constructor(
		@Optional() @Inject(PLATFORM_ID) platformId: string,
		@Optional() private window: Window,
		private _ngZone: NgZone,

		private el: ElementRef,
		private renderer: Renderer2,
	) {
		this.isBrowser = isPlatformBrowser(platformId);
	}

	ngAfterViewInit() {
		if (!this.isBrowser || !this.window) {
			return;
		}

		const currentBgColor = this.window.getComputedStyle(
			this.el.nativeElement,
		).backgroundColor;

		const newBgColor = this.gradateColor(
			currentBgColor,
			this.gradientLevel,
		);

		this.renderer.setStyle(
			this.el.nativeElement,
			"backgroundColor",
			newBgColor,
		);
	}

	private gradateColor(color: string, level: number): string {
		const gradatedValue =
			level *
			this.bnGradientFactor *
			(this.bnGradientMode === "darken" ? -1 : 1);

		const rgb = color
			.replace(/^(rgb|rgba)\(/, "")
			.replace(/\)$/, "")
			.split(",")
			.map(parseFloat);

		const newRgb = {
			r: Math.max(0, rgb[0] + gradatedValue),
			g: Math.max(0, rgb[1] + gradatedValue),
			b: Math.max(0, rgb[2] + gradatedValue),
		};

		return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
	}
}

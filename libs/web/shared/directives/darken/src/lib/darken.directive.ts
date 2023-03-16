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
import { take, tap } from "rxjs";

@Directive({
	selector: "[bnDarken]",
})
export class DarkenDirective implements AfterViewInit {
	@Input("bnDarken") darkenLevel!: number;

	@Input() bnDarkenFactor = 50;

	isBrowser: boolean;

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

		this._ngZone.onStable
			.pipe(
				take(1),
				tap(() => {
					const currentBgColor = this.window.getComputedStyle(
						this.el.nativeElement,
					).backgroundColor;

					const newBgColor = this.darkenColor(
						currentBgColor,
						this.darkenLevel,
					);

					this.renderer.setStyle(
						this.el.nativeElement,
						"backgroundColor",
						newBgColor,
					);
				}),
			)
			.subscribe();
	}

	private darkenColor(color: string, level: number): string {
		const darkenValue = level * this.bnDarkenFactor;
		const rgb = color
			.replace(/^(rgb|rgba)\(/, "")
			.replace(/\)$/, "")
			.split(",")
			.map(parseFloat);

		const newRgb = {
			r: Math.max(0, rgb[0] - darkenValue),
			g: Math.max(0, rgb[1] - darkenValue),
			b: Math.max(0, rgb[2] - darkenValue),
		};
		return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
	}
}

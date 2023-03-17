import { Directive, HostListener } from "@angular/core";

@Directive({
	selector: "[bnClickStopPropagation]",
})
export class ClickStopPropagationDirective {
	@HostListener("click", ["$event"]) onClick(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
	}
}

import {
	ChangeDetectionStrategy,
	Component,
	Host,
	Input,
	OnInit,
	Optional,
	ViewEncapsulation,
} from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { BEAN_PROCESS, ROAST_LEVEL } from "@bn/web/note/data-access";
import { mapToIcon } from "@bn/web/note/utils";

@Component({
	selector: "bn-bean-deatil-form",
	host: { class: "bn-bean-deatil-form" },
	templateUrl: "./bean-deatil-form.component.html",
	styleUrls: ["./bean-deatil-form.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeanDeatilFormComponent implements OnInit {
	@Input() formGroupName!: string;

	beanDetailForm!: FormGroup;

	readonly beanProcess = BEAN_PROCESS;

	readonly roastLevel = ROAST_LEVEL;

	mapToIcon = mapToIcon;

	get originCountry(): FormControl<string | null> {
		const control = this.beanDetailForm.get("originCountry");
		this.assertControl(control);

		return control;
	}

	constructor(
		@Host() @Optional() private parentFormGroup: FormGroupDirective,
	) {}

	ngOnInit() {
		if (!this.parentFormGroup) {
			throw new Error("Must be used with parent form!");
		}

		this.beanDetailForm = this.parentFormGroup.control.get(
			this.formGroupName,
		) as FormGroup;
	}

	formatAltitudeLabel(value: number): string {
		return `${value}masl`;
	}

	/**
	 * Mostly to try out an `asserts` function
	 */
	private assertControl(c: unknown): asserts c is FormControl<string | null> {
		if (!this.beanDetailForm.get("originCountry")) {
			throw new Error("originCountry control is required!");
		}
	}
}

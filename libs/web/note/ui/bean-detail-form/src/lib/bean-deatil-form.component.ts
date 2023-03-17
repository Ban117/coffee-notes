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
import {
	BeanProcess,
	BEAN_PROCESS,
	ROAST_LEVEL,
} from "@bn/web/note/data-access";

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

	/**
	 * Uses typescript exhaustiveness checking so that if we add a new process and don't
	 * map to an icon, we'll get a type error and not a runtime error/empty icon
	 */
	mapBeanProcessToIcon(process: BeanProcess): string {
		switch (process) {
			case "honey":
				return "hive";
			case "natural":
				return "sunny";
			case "washed":
				return "wash";
		}
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

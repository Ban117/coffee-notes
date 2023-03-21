import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	ViewEncapsulation,
} from "@angular/core";
import { Observable, tap, filter, take } from "rxjs";

import { ObjectValues } from "@bn/web/shared/utils";

// say no to TS enums
export const UPLOADER_STATE = {
	readyToUpload: "readyToUpload",
	uploading: "uploading",
	complete: "complete",
} as const;

export type UploaderState = ObjectValues<typeof UPLOADER_STATE>;

@Component({
	selector: "bn-uploader",
	host: { class: "bn-uploader" },
	templateUrl: "./uploader.component.html",
	styleUrls: ["./uploader.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploaderComponent {
	@ViewChild("fileUploadInput", { static: true })
	fileUploadInput!: ElementRef<HTMLInputElement>;

	@Output() readonly stateChange = new EventEmitter<UploaderState>();

	@Input() uploaderFn!: (file: File) => Observable<number | undefined>;

	@Input() showFilename = true;

	get state(): UploaderState {
		return this._state;
	}
	set state(value: UploaderState) {
		if (value === this._state) {
			return;
		}

		this._state = value;
		this.stateChange.emit(value);
	}

	filename: string | undefined;

	private _state: UploaderState = UPLOADER_STATE.readyToUpload;

	addFiles(event: Event) {
		if (!event || !event.target) {
			return;
		}

		const file = (event.target as HTMLInputElement).files?.[0];

		if (!file) {
			return;
		}

		this.filename = file.name;
		this.state = UPLOADER_STATE.uploading;

		this.uploaderFn(file)
			.pipe(
				filter(x => x === 100),
				take(1),
				tap(() => {
					this.fileUploadInput.nativeElement.value = "";
					this.state = UPLOADER_STATE.complete;
				}),
			)
			.subscribe();
	}
}

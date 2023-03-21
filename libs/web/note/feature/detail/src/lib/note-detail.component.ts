import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { NoteService } from "@bn/web/note/data-access";
import { UploaderState } from "@bn/web/shared/ui/uploader";

import { v4 as uuidv4 } from "uuid";
import { Observable } from "rxjs";

// todo base linear on whether we're in edit or create
@Component({
	selector: "bn-note-detail",
	host: { class: "bn-note-detail" },
	templateUrl: "./note-detail.component.html",
	styleUrls: ["./note-detail.component.scss"],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteDetailComponent {
	readonly noteForm = this.fb.group({
		beanDetailForm: this.fb.group({
			name: "",
			roaster: "",
			roastDate: "",
			originCountry: "",
			originRegion: "",
			altitude: 0,
			process: "",
			roastLevel: "",
		}),
		brewDetailForm: this.fb.group({
			brewMethod: "",
			beanDose: 0,
			waterAmount: 0,
			grindSize: 0,
			brewDuration: 0,
			extraNotes: "",
		}),
		tastingNotesForm: this.fb.group({
			aromas: [""],
			flavors: [""],
			body: 0,
			intensity: 0,
			acidity: 0,
			bitterness: 0,
			sweetness: 0,
			extraNotes: "",
		}),
	});

	// todo rm, just for testing uploader
	uploaderFn = (file: File) => this._uploaderFn(file);

	constructor(
		private fb: FormBuilder,
		private noteService: NoteService,
		private angularFireService: AngularFirestore,
		private angularFireStorage: AngularFireStorage,
	) {}

	_uploaderFn(file: File): Observable<number | undefined> {
		const filename = file.name;
		const userUid = "3io3MjDDe8VmOpOqPdG3YYdfGRo2"; // todo get from state

		const uploadTask = this.angularFireStorage.upload(
			`images/${userUid}/${uuidv4()}/${filename}`,
			file,
		);

		uploadTask.then(uploadTaskSnapshot => {
			uploadTaskSnapshot.ref.getDownloadURL().then(url => {
				this.angularFireService
					.collection("coffee_notes")
					.doc(userUid)
					.collection("notes")
					.doc()
					.set({
						brewMethod: "aeropressxxx",
						duration: 12,
						imageUrl: url,
					});
			});
		});

		return uploadTask.percentageChanges();
	}

	// todo rm
	onStateChange(e: UploaderState) {
		console.warn("%c>>>> onStateChange", "color: HotPink", e);
	}

	logForm() {
		console.warn(">>>> this.beanDetailForm", this.noteForm);
	}
}

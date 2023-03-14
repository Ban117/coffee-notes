import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AuthActions, AuthState } from "@bn/web/auth/data-access";
import { Store } from "@ngxs/store";
import { map, tap } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class NoteService {
	private user$ = this.store.select(AuthState.user);

	constructor(
		private angularFireService: AngularFirestore,
		private store: Store,
	) {}

	testCollectionAddDocument(obj: any) {
		const collectionRef =
			this.angularFireService.collection("coffee_notes");

		// 1. adding with auto-generated id for document
		// collectionRef.add({
		// 	boq: "testy",
		// });

		collectionRef.add(obj);
	}

	testDocumentUpdate() {
		const itemDocRef = this.angularFireService.doc(
			"coffee_notes/09ETg2na5WnKSFyrfQCy",
		);

		itemDocRef.update({ penis: false });
	}

	testCollectionDataStreaming() {
		const collectionRef =
			this.angularFireService.collection("coffee_notes");

		// *** streaming collection data ***

		// 2. streaming collection valueChanges (stripped of metadata)
		collectionRef
			.valueChanges()
			.pipe(
				tap(x =>
					console.warn("%c>>>> valueChanges_1", "color: Thistle", x),
				),
			)
			.subscribe();

		// 3. streaming collection valueChanges with provided `id` field
		collectionRef
			.valueChanges({ idField: "custom_id_prop" })
			.pipe(
				tap(x =>
					console.warn(
						"%c>>>> valueChanges_2",
						"color: Aquamarine",
						x,
					),
				),
			)
			.subscribe();

		// 4. streaming collection snapshotChanges (has metadata)
		collectionRef
			.snapshotChanges()
			.pipe(
				tap(x =>
					console.warn("%c>>>> snapshotChanges", "color: Coral", x),
				),
				tap(() => console.warn(">>>> --------------------")),
			)
			.subscribe();

		// ! there are other methods,
	}

	testDocumentDataStreaming() {
		const itemDocRef = this.angularFireService.doc(
			"coffee_notes/09ETg2na5WnKSFyrfQCy",
		);

		// 1. streaming document valueChanges (stripped of metadata)
		itemDocRef
			.valueChanges()
			.pipe(
				tap(x =>
					console.warn(
						"%c>>>> valueChanges_1",
						"color: DarkTurquoise",
						x,
					),
				),
			)
			.subscribe();

		// 2. streaming document valueChanges with provided `id` field
		itemDocRef
			.valueChanges({ idField: "custom_id_prop" })
			.pipe(
				tap(x =>
					console.warn("%c>>>> valueChanges_2", "color: HotPink", x),
				),
			)
			.subscribe();

		// 3. streaming document snapshotChanges (has metadata)
		itemDocRef
			.snapshotChanges()
			.pipe(
				tap(x =>
					console.warn(
						"%c>>>> snapshotChanges",
						"color: OliveDrab",
						x,
					),
				),
				tap(() => console.warn(">>>> --------------------")),
			)
			.subscribe();
	}
}

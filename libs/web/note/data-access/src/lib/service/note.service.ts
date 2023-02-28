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
}

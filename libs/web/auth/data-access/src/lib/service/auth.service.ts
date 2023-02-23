import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";

import firebase from "firebase/compat/app";
import { catchError, from, Observable, throwError } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	user$ = this.angularFireAuth.user;

	constructor(private angularFireAuth: AngularFireAuth) {}

	signUp$(
		email: string,
		password: string,
	): Observable<firebase.auth.UserCredential> {
		return from(
			this.angularFireAuth.createUserWithEmailAndPassword(
				email,
				password,
			),
		).pipe(catchError(this.throwErrorMessage$));
	}

	login$(
		email: string,
		password: string,
	): Observable<firebase.auth.UserCredential> {
		return from(
			this.angularFireAuth.signInWithEmailAndPassword(email, password),
		).pipe(catchError(this.throwErrorMessage$));
	}

	logout$(): Promise<void> {
		return this.angularFireAuth.signOut();
	}

	private throwErrorMessage$(
		errorRes: firebase.FirebaseError,
	): Observable<never> {
		let errorMessage = "An unknown error occurred!!";

		if (!errorRes.code) {
			return throwError(() => errorMessage);
		}

		switch (errorRes.code) {
			case "auth/email-already-in-use":
				errorMessage = "This email is already in use.";
				break;
			case "auth/user-not-found":
				errorMessage = "This email does not exist.";
				break;
			case "auth/wrong-password":
				errorMessage = "This password is not correct.";
				break;
			case "auth/too-many-requests":
				errorMessage = "Too many requests, try again later!";
				break;
		}

		return throwError(() => errorMessage);
	}
}

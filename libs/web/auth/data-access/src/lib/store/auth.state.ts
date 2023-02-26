/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import firebase from "firebase/compat/app";
import { take, tap } from "rxjs";
import { AuthService } from "../service";
import { AuthActions } from "./auth.actions";

// todo consider using `UserInfo` instead of `User`
export interface AuthStateModel {
	user: firebase.User | null;
}

@State<AuthStateModel>({
	name: "auth",
	defaults: { user: null },
})
@Injectable()
export class AuthState {
	constructor(private authService: AuthService) {}

	@Selector()
	static user(state: AuthStateModel): firebase.User | null {
		return state.user;
	}

	@Action(AuthActions.LoadUser)
	loadUser(ctx: StateContext<AuthStateModel>) {
		const user = ctx.getState().user;
		if (user) {
			return;
		}

		return this.authService.user$.pipe(
			take(1),
			tap(user => ctx.patchState({ user })),
		);
	}

	@Action(AuthActions.Login)
	login(
		ctx: StateContext<AuthStateModel>,
		{ email, password }: AuthActions.Login,
	) {
		return this.authService
			.login$(email, password)
			.pipe(
				tap(userCredential =>
					ctx.patchState({ user: userCredential.user }),
				),
			);
	}

	@Action(AuthActions.Signup)
	signup(
		ctx: StateContext<AuthStateModel>,
		{ email, password }: AuthActions.Signup,
	) {
		return this.authService
			.signUp$(email, password)
			.pipe(
				tap(userCredential =>
					ctx.patchState({ user: userCredential.user }),
				),
			);
	}

	@Action(AuthActions.Logout)
	logout(ctx: StateContext<AuthStateModel>) {
		return this.authService.logout$().then(() => {
			ctx.patchState({ user: null });
		});
	}
}

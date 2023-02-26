const ACTION_PREFIX = "[Auth]";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthActions {
	export class Login {
		static readonly type = `${ACTION_PREFIX} Login`;

		constructor(public email: string, public password: string) {}
	}

	export class Signup {
		static readonly type = `${ACTION_PREFIX} Signup`;

		constructor(public email: string, public password: string) {}
	}

	export class Logout {
		static readonly type = `${ACTION_PREFIX} Logout`;
	}

	export class LoadUser {
		static readonly type = `${ACTION_PREFIX} Load User`;
	}
}

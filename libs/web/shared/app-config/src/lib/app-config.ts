export interface FirebaseConfig {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}

export interface AppConfig {
	testing: string;
	firebaseConfig: FirebaseConfig;
}

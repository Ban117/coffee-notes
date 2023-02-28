// most of these need to be optional otherwise this form will suck to fill out
export type RoastLevel = "light" | "medium" | "dark";
export type BeanProcess = "natural" | "washed" | "honey";

export interface BeanDetail {
	id: string; // auto-add from firestore
	name: string;
	roaster: string;
	roastDate: string;
	originCountry: string;
	originRegion: string;
	altitude: number;
	process: BeanProcess;
	roastLevel: RoastLevel;
}

export type BrewMethod = "pourOver" | "espresso";

export interface BrewNote {
	brewMethod: BrewMethod;
	beanDose: number;
	waterAmount: number;
	grindSize: number;
	brewDuration: number;
	extraNotes: string;
}

export interface TastingNote {
	aromas: string[]; // maybe these could be like tags/chips?
	flavors: string[]; // maybe these could be like tags?
	body: number; // like 1 - 10, light - heavy
	intensity: number; // like 1 - 10, low - high
	acidity: number; // like 1 - 10, low - high
	bitterness: number; // like 1 - 10, low - high
	sweetness: number; // like 1 - 10, low - high
	extraNotes: string;
}

export interface Note {
	beanDetail: BeanDetail;
	brewNote: BrewNote;
	tastingNote: TastingNote;
	date: string;
	image?: string; // url?
}

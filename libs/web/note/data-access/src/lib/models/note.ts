// most of these need to be optional otherwise this form will suck to fill out
export type RoastLevel = "light" | "medium" | "dark";
export type BeanProcess = "natural" | "washed" | "honey";

export interface BeanDetail {
	id: string; // auto-add from firestore
	name: string;
	roaster: string | undefined;
	roastDate: string | undefined;
	originCountry: string | undefined;
	originRegion: string | undefined;
	altitude: number | undefined;
	process: BeanProcess | undefined;
	roastLevel: RoastLevel | undefined;
}

export type BrewMethod = "pourOver" | "espresso";

export interface BrewNote {
	brewMethod: BrewMethod | undefined;
	beanDose: number | undefined;
	waterAmount: number | undefined;
	grindSize: number | undefined;
	brewDuration: number | undefined;
	extraNotes: string | undefined;
}

export interface TastingNote {
	aromas: string[] | undefined; // maybe these could be like tags/chips?
	flavors: string[] | undefined; // maybe these could be like tags?
	body: number | undefined; // like 1 - 10, light - heavy
	intensity: number | undefined; // like 1 - 10, low - high
	acidity: number | undefined; // like 1 - 10, low - high
	bitterness: number | undefined; // like 1 - 10, low - high
	sweetness: number | undefined; // like 1 - 10, low - high
	extraNotes: string | undefined;
}

export interface Note {
	id: string;
	beanDetail: BeanDetail;
	brewNote: BrewNote;
	tastingNote: TastingNote;
	date: string;
	image?: string; // url?
}

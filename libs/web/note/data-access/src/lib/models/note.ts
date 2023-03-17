import { ExtractTypeFromReadonlyArray } from "@bn/web/shared/utils";

// TS enum replacement, similar to using a pojo with `as const` but wanted to
// keep this as an array
export const ROAST_LEVEL = ["light", "medium", "dark", "espresso"] as const;
export type RoastLevel = ExtractTypeFromReadonlyArray<typeof ROAST_LEVEL>;

export const BEAN_PROCESS = ["natural", "washed", "honey"] as const;
export type BeanProcess = ExtractTypeFromReadonlyArray<typeof BEAN_PROCESS>;

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

export const BREW_METHOD = ["pourOver", "espresso"] as const;
export type BrewMethod = ExtractTypeFromReadonlyArray<typeof BREW_METHOD>;

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

import { BeanProcess, BrewMethod } from "@bn/web/note/data-access";

/**
 * Uses typescript exhaustiveness checking so that if we add a item and don't
 * map to an icon, we'll get a type error and not a runtime error/empty icon
 */
export function mapToIcon(item: BeanProcess | BrewMethod): string {
	switch (item) {
		case "honey":
			return "hive";
		case "natural":
			return "sunny";
		case "washed":
			return "wash";
		case "pourOver":
			return "coffee";
		case "espresso":
			return "coffee_maker";
	}
}

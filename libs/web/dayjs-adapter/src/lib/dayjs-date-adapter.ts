import { Inject, Optional } from "@angular/core";
import {
	DateAdapter,
	MatDateFormats,
	MAT_DATE_LOCALE,
} from "@angular/material/core";

import * as _dayjs from "dayjs";
import * as localeData from "dayjs/plugin/localeData";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
import * as customParseFormat from "dayjs/plugin/customParseFormat";

export const MAT_DAYJS_DATE_FORMATS: MatDateFormats = {
	parse: {
		dateInput: "l",
	},
	display: {
		dateInput: "DD/MM/YYYY",
		monthYearLabel: "MMM YYYY",
		dateA11yLabel: "LL",
		monthYearA11yLabel: "MMMM YYYY",
	},
};

function range<T>(length: number, valueFunction: (index: number) => T): T[] {
	const valuesArray = Array(length);
	for (let i = 0; i < length; i++) {
		valuesArray[i] = valueFunction(i);
	}
	return valuesArray;
}

// https://www.npmjs.com/package/@tabuckner/material-dayjs-adapter
export class DayjsAdapter extends DateAdapter<_dayjs.Dayjs> {
	private localeData!: {
		firstDayOfWeek: number;
		longMonths: string[];
		shortMonths: string[];
		dates: string[];
		longDaysOfWeek: string[];
		shortDaysOfWeek: string[];
		narrowDaysOfWeek: string[];
	};

	constructor(@Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string) {
		super();
		this.initializeParser(dateLocale || _dayjs.locale());
	}

	override setLocale(dateLocale: string) {
		super.setLocale(dateLocale);

		_dayjs.locale(dateLocale);

		const dayJsLocaleData = _dayjs().localeData();

		this.localeData = {
			firstDayOfWeek: dayJsLocaleData.firstDayOfWeek(),
			longMonths: dayJsLocaleData.months(),
			shortMonths: dayJsLocaleData.monthsShort(),
			dates: range(31, i => this.createDate(2017, 0, i + 1).format("D")),
			longDaysOfWeek: range(7, i =>
				_dayjs().set("day", i).format("dddd"),
			),
			shortDaysOfWeek: dayJsLocaleData.weekdaysShort(),
			narrowDaysOfWeek: dayJsLocaleData.weekdaysMin(),
		};
	}

	private initializeParser(dateLocale: string) {
		_dayjs.extend(localizedFormat);
		_dayjs.extend(customParseFormat);
		_dayjs.extend(localeData);

		this.setLocale(dateLocale);
	}

	// https://github.com/2sic/eav-ui
	parse(value: unknown, parseFormat: string): _dayjs.Dayjs | null {
		if (value && typeof value === "string") {
			const longDateFormat = _dayjs()
				.localeData()
				.longDateFormat(parseFormat); // MM/DD/YYY or DD-MM-YYYY, etc.

			let parsed = _dayjs(value, longDateFormat, this.locale);

			if (parsed.isValid()) {
				// string value is exactly like long date format
				return parsed;
			}

			if (value.length === 9) {
				// user might have typed 1-12-2020 or 12/1/2020
				// try to parse with D-MM-YYYY or MM/D/YYYY (based on long date format)
				const formatWithSmallDay = longDateFormat.replace("DD", "D");
				parsed = _dayjs(value, formatWithSmallDay, this.locale);
				if (parsed.isValid()) {
					return parsed;
				}

				// user might have typed 25-1-2020 or 1/25/2020
				// try to parse with DD-M-YYYY or M/DD/YYYY (based on long date format)
				const formatWithSmallMonth = longDateFormat.replace("MM", "M");
				parsed = _dayjs(value, formatWithSmallMonth, this.locale);
				if (parsed.isValid()) {
					return parsed;
				}
			}

			if (value.length === 8) {
				// user might have typed 24012020 or 01242020
				// strip long date format of non-alphabetic characters so we get MMDDYYYY or DDMMYYYY
				const formatWithoutSeparators = longDateFormat.replace(
					/[\W_]+/g,
					"",
				);
				parsed = _dayjs(value, formatWithoutSeparators, this.locale);
				if (parsed.isValid()) {
					return parsed;
				}

				// user might have typed 1-2-2020 or 2/1/2020
				// try to parse with D-M-YYYY or M/D/YYYY (based on long date format)
				const formatWithSmallDayAndMonth = longDateFormat
					.replace("DD", "D")
					.replace("MM", "M");
				parsed = _dayjs(value, formatWithSmallDayAndMonth, this.locale);
				if (parsed.isValid()) {
					return parsed;
				}
			}

			if (value.length < 6 && value.length > 2) {
				// user might have typed 01/24, 24-01, 1/24, 24/1 or 24-1
				// try to extract month and day part and parse them with custom format
				let parts: string[] = [];
				if (value.indexOf("/") !== -1) {
					parts = value.split("/");
				}
				if (value.indexOf("-") !== -1) {
					parts = value.split("-");
				}
				if (value.indexOf(".") !== -1) {
					parts = value.split(".");
				}
				if (parts.length === 2) {
					let dayPart = "";
					let monthPart = "";

					if (longDateFormat.startsWith("D")) {
						dayPart = parts[0];
						monthPart = parts[1];
					} else if (parts.length > 1) {
						monthPart = parts[0];
						dayPart = parts[1];
					}
					if (monthPart.length === 1) {
						monthPart = 0 + monthPart;
					}
					if (dayPart.length === 1) {
						dayPart = 0 + dayPart;
					}
					parsed = _dayjs(dayPart + monthPart, "DDMM", this.locale);
					if (parsed.isValid()) {
						return parsed;
					}
				}
			}

			if (value.length === 2) {
				// user might have typed 01, parse DD only
				const format = "DD";
				parsed = _dayjs(value, format, this.locale);
				if (parsed.isValid()) {
					return parsed;
				}
			}

			if (value.length === 1) {
				// user might have typed 1, parse D only
				const format = "D";
				parsed = _dayjs(value, format, this.locale);

				if (parsed.isValid()) {
					return parsed;
				}
			}

			// not able to parse anything sensible, return something invalid so input can be corrected
			return _dayjs(null);
		}

		return value && value instanceof _dayjs.Dayjs
			? _dayjs(value).locale(this.locale)
			: null;
	}

	getYear(date: _dayjs.Dayjs): number {
		return _dayjs(date).year();
	}

	getMonth(date: _dayjs.Dayjs): number {
		return _dayjs(date).month();
	}

	getDate(date: _dayjs.Dayjs): number {
		return _dayjs(date).date();
	}
	getDayOfWeek(date: _dayjs.Dayjs): number {
		return _dayjs(date).day();
	}
	getMonthNames(style: "long" | "short" | "narrow"): string[] {
		return style === "long"
			? this.localeData.longMonths
			: this.localeData.shortMonths;
	}
	getDateNames(): string[] {
		return this.localeData.dates;
	}
	getDayOfWeekNames(style: "long" | "short" | "narrow"): string[] {
		if (style === "long") {
			return this.localeData.longDaysOfWeek;
		}
		if (style === "short") {
			return this.localeData.shortDaysOfWeek;
		}
		return this.localeData.narrowDaysOfWeek;
	}
	getYearName(date: _dayjs.Dayjs): string {
		return _dayjs(date).format("YYYY");
	}
	getFirstDayOfWeek(): number {
		return this.localeData.firstDayOfWeek;
	}
	getNumDaysInMonth(date: _dayjs.Dayjs): number {
		return _dayjs(date).daysInMonth();
	}
	clone(date: _dayjs.Dayjs): _dayjs.Dayjs {
		return date.clone();
	}
	createDate(year: number, month: number, date: number): _dayjs.Dayjs {
		const returnDayjs = _dayjs()
			.set("year", year)
			.set("month", month)
			.set("date", date);

		return returnDayjs;
	}

	today(): _dayjs.Dayjs {
		return _dayjs();
	}

	format(date: _dayjs.Dayjs, displayFormat: string): string {
		if (!this.isValid(date)) {
			throw Error("DayjsDateAdapter: Cannot format invalid date.");
		}
		return date.locale(this.locale).format(displayFormat);
	}

	addCalendarYears(date: _dayjs.Dayjs, years: number): _dayjs.Dayjs {
		return date.add(years, "year");
	}

	addCalendarMonths(date: _dayjs.Dayjs, months: number): _dayjs.Dayjs {
		return date.add(months, "month");
	}

	addCalendarDays(date: _dayjs.Dayjs, days: number): _dayjs.Dayjs {
		return date.add(days, "day");
	}

	toIso8601(date: _dayjs.Dayjs): string {
		return date.toISOString();
	}

	isDateInstance(obj: unknown): boolean {
		return _dayjs.isDayjs(obj);
	}

	isValid(date: _dayjs.Dayjs): boolean {
		return _dayjs(date).isValid();
	}

	invalid(): _dayjs.Dayjs {
		return _dayjs(null);
	}
}

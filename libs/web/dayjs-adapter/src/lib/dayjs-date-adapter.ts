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
		dateInput: "MM/DD/YYYY",
	},
	display: {
		dateInput: "MM/DD/YYYY",
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
	// todo `!`
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
	parse(value: unknown, parseFormat: string): _dayjs.Dayjs | null {
		if (value && typeof value === "string") {
			return _dayjs(
				value,
				_dayjs().localeData().longDateFormat(parseFormat),
				this.locale,
			);
		}

		return value && value instanceof _dayjs.Dayjs
			? _dayjs(value).locale(this.locale)
			: null;
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

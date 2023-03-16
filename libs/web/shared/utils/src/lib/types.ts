export type ExtractTypeFromReadonlyArray<T> = T extends ReadonlyArray<infer U>
	? U
	: never;

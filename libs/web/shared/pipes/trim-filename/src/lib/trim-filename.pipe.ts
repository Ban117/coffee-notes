import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "trimFilename",
})
export class TrimFilenamePipe implements PipeTransform {
	transform(
		value: string,
		fileNameHeadMaxLenght = 10,
		fileNameTailMaxLenght = 3,
		filler = "...",
	): string {
		const [fileName, extensionName] = value.split(".", 2);

		if (fileName.length <= fileNameHeadMaxLenght) {
			return value;
		}

		const trimmedFileNameHead = fileName.substring(
			0,
			fileNameHeadMaxLenght,
		);
		const trimmedFileNameTail = fileName.slice(-fileNameTailMaxLenght);

		const output =
			trimmedFileNameHead +
			filler +
			trimmedFileNameTail +
			"." +
			extensionName;

		return output;
	}
}

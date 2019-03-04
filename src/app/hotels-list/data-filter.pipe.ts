import * as _ from "lodash"; 
import {Pipe ,PipeTransform} from '@angular/core';
import { pipe } from "@angular/core/src/render3";

@Pipe({
    name:"dataFilter"
})

export class DataFilterPipe implements PipeTransform {
	transform(array: any[], query: string) : any {
		if(query) {
			return _.filter(array, row=> row.description.indexOf(query) > -1);
		}
		return array;
	}
}
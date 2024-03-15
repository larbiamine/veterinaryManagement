import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseToStringAndDatePipe implements PipeTransform {
    private exceptions: string[];

    constructor(exceptions: string[]) {
      this.exceptions = exceptions;
    }
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (this.exceptions.includes(key)) {
            continue;
          }
        if (typeof value[key] === 'number') {
          value[key] = value[key].toString();
        } else if (this.isDateString(value[key])) {
          value[key] = new Date(value[key]);
        }
      }
    }
    return value;
  }

  private isDateString(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    const date = Date.parse(value);
    return !isNaN(date);
  }
}
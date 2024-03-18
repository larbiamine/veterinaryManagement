import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  private exceptions: string[];
  private dateField: string;

  constructor(exceptions: string[], dateField: string) {
    this.exceptions = exceptions;
    this.dateField = dateField;
  }
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (!this.exceptions.includes(key) && key == this.dateField) {
          if (this.isDateString(value[key])) {
            value[key] = new Date(value[key]).toISOString();
          }
        }
      }
    }
    return value;
  }

  private isDateString(value: any): boolean {
    if (typeof value !== 'string') {
        throw new Error("invalid Date format");
    }
    const date = Date.parse(value);
    return !isNaN(date);
  }
}

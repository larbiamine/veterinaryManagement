import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  private exceptions: string[];

  constructor(exceptions: string[]) {
    this.exceptions = exceptions;
  }
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (!this.exceptions.includes(key)) {
          if (this.isDateString(value[key])) {
            value[key] = new Date(value[key]);
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

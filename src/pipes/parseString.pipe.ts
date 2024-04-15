import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseStringPipe implements PipeTransform {
  private exceptions: string[];

  constructor(exceptions: string[]) {
    this.exceptions = exceptions;
  }
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (!this.exceptions.includes(key)) {
          value[key] = value[key].toString();
        }
      }
    }
    return value;
  }
}

import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  constructor() {}
  transform(value: any) {
    if (typeof value !== 'string') {
      throw new Error('invalid Date format');
    }
    value = new Date( Date.parse(value));
    return value;
  }
}

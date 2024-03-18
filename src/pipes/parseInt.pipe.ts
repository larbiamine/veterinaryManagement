import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ParseIdIntPipe implements PipeTransform {
  private toParse: string[];

  constructor(toParse: string[]) {
    this.toParse = toParse;
  }
  transform(value: any) {
    if (typeof value === 'object' && value !== null) {
      for (let key in value) {
        if (this.toParse.includes(key)) {
          value[key] = parseInt(value[key]);
        }
      }
    }
    return value;
  }
}

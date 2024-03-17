import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
  isString(str: any): boolean {
    return typeof str === 'string';
  }
  areAllFieldsStrings(obj: any, exceptions: string[]): boolean {
    console.log('🆘 || exceptions:', exceptions);
    for (let key in obj) {
      if (!(exceptions.includes(key))) {

        if (this.isString(obj[key]) === false) {
            return false;
        }
      }

    }
    return true;
  }
}

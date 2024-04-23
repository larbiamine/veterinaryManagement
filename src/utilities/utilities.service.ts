import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {

  constructor() {}

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

  customConsoleTable(data, maxChars) {
      // Iterate through each row in the data
      for (let i = 0; i < data.length; i++) {
          // Iterate through each property in the row
          for (const prop in data[i]) {
              // If the property value is a string and its length exceeds maxChars, truncate it
              if (typeof data[i][prop] === 'string' && data[i][prop].length > maxChars) {
                  data[i][prop] = data[i][prop].substring(0, maxChars) + '...';
              }
          }
      }
      // Call the original console.table with the modified data
      console.table(data);
  }

}

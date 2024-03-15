import { Injectable } from '@nestjs/common';


@Injectable()
export class UtilitiesService {
    isString(idCardNumber: any): boolean {
        return typeof idCardNumber === 'string';
    }
    areAllFieldsStrings(obj: any, exceptions: string[]): boolean {
        for (let key in obj) {
            if (key in exceptions) {
                continue;
            }
            if (this.isString(obj[key]) === false){
                return false;
                
            }
        }
        return true;
    }
}
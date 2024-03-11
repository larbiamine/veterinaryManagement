import { Injectable } from '@nestjs/common';


@Injectable()
export class UtilitiesService {
    isString(idCardNumber: any): boolean {
        return typeof idCardNumber === 'string';
    }
    areAllFieldsStrings(obj: any): boolean {
        for (let key in obj) {
            if (key == "id") {
                continue;
            }
            if (this.isString(obj[key]) === false){
                return false;
                
            }
        }
        return true;
    }
}

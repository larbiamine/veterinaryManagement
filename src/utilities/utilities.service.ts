import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilitiesService {
    isString(idCardNumber: any): boolean {
        return typeof idCardNumber === 'string';
    }
}

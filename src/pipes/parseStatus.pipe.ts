import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';
import { AppointmentStatus } from '@prisma/client';
import { setStatusInput } from 'src/appointment/entities/appointment.entity';

@Injectable()
export class ParseStatusPipe implements PipeTransform {

  transform(value: setStatusInput, metadata: ArgumentMetadata) {

    if (metadata.type === 'body') { // checking if metadata is body because it was processing the param id as well

      if (!this.isValidStatus(value)) {
        throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
      }
    }
    return value;
  }

  private isValidStatus(value: setStatusInput): boolean {

    const statuses = Object.values(AppointmentStatus) as string[];
    return statuses.includes(value.status);
  }
}

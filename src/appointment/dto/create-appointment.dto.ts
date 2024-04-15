import { AppointmentStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

// Define the DTO for Appointment
export class CreateAppointmentDTO {
  @IsNotEmpty({ message: 'owner is required' })
  ownerId: number;
  vetId?: number | null;
  @IsNotEmpty({ message: 'animal is required' })
  animalId: number;
  @IsNotEmpty({ message: 'date is required' })
  date: Date;
  status: AppointmentStatus;
  description: string;
  reason: string;
}

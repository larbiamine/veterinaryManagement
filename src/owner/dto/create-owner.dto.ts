// owner.dto.ts

import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsNotEmpty, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';
// import { CreateAnimalDto } from './create-animal.dto'; // Assuming you have Animal DTO defined

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'Firstname is required' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'Lastname is required' })
  @IsString()
  lastName: string;

  @IsNotEmpty({ message: 'phoneNumber is required' })
  @IsString()
  phoneNumber: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'email is required' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'idCardNumber is required' })
  @IsString()
  idCardNumber: string;

  @Optional()
  @IsString()
  city: string;

  @Optional()
  @IsString()
  address: string;

  // @IsOptional()
  // @IsArray()
  // // @ValidateNested({ each: true })
  // // @Type(() => CreateAnimalDto) // Assuming you have Animal DTO defined
  // // animals?: CreateAnimalDto[];
  // animals?: any[];
}




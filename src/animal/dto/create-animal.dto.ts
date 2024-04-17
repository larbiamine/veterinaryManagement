import { IsArray, IsDate, IsNotEmpty, IsString } from 'class-validator';

enum Gender {
  Male = 'Male',
  Female = 'Female',
  male = 'male',
  female = 'female',
}

export class CreateAnimalDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNotEmpty({ message: 'species is required' })
  species: string;

  @IsNotEmpty({ message: 'race is required' })
  race: string;

  @IsNotEmpty({ message: 'gender is required' })
  gender: Gender;

  @IsNotEmpty({ message: 'age is required' })
  age: string;

  dateOfBirth: Date | string;

  @IsArray()
  distinctiveQualities: Array<string>;

  @IsNotEmpty({ message: 'ownerId is required' })
  ownerId: number;

  vetId: number;
}

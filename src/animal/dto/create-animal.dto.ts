import { IsDate, IsNotEmpty, IsString } from "class-validator";

enum Gender {
    Male = 'Male',
    Female = 'Female',
    male = 'male',
    female = 'female'
}

export class CreateAnimalDto {
    @IsNotEmpty({ message: 'name is required' })
    @IsString()
    name: string;

    @IsNotEmpty({ message: 'species is required' })
    @IsString()
    species: string;

    @IsString()
    race: string;

    @IsNotEmpty({ message: 'gender is required' })
    @IsString()
    gender: Gender;

    @IsNotEmpty({ message: 'age is required' })
    @IsString()
    age: string;

    @IsDate()
    dateOfBirth: Date | string;

    @IsString()
    distinctiveQualities: Array<string>;

    @IsNotEmpty({ message: 'ownerId is required' })
    @IsString()
    ownerId: number;

    @IsString()
    vetId: number;

    
}
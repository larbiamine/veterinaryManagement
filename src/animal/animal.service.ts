import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import {  PrismaUncheckedAnimal } from './entities/animal.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class AnimalService {
  constructor(
    private prisma: PrismaService,
    private readonly utilitiesService: UtilitiesService,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    // if (!this.utilitiesService.areAllFieldsStrings(CreateOwnerDto, ['id', 'ownerId', 'vetId'])) {
    //   throw new NotFoundException('all fields should be a string');
    // }
    // createAnimalDto.dateOfBirth = new Date(createAnimalDto.dateOfBirth);
    const animal = await this.prisma.animal.create({
      data: createAnimalDto,
    });
    return animal;
  }

  async findAll(): Promise<PrismaUncheckedAnimal[]> {
    const animals = await this.prisma.animal.findMany();
    return animals;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}

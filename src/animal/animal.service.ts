import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PrismaUncheckedAnimal } from './entities/animal.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnimalService {
  constructor(private prisma: PrismaService) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const animal = await this.prisma.animal.create({
      data: createAnimalDto,
    });
    return animal;
  }

  async findAll(): Promise<PrismaUncheckedAnimal[]> {
    const animals = await this.prisma.animal.findMany();
    return animals;
  }

  async findOne(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: {
        id,
      },
    });
    if (!animal) {
      throw new NotFoundException('animal not found');
    }

    return animal;
  }

  async update(findId: number, updateAnimalDto: UpdateAnimalDto) {

    if ('id' in updateAnimalDto) {
      throw new NotFoundException('id cannot be updated');
    }

    const animal = await this.prisma.animal.findUnique({
      where: { id: findId },
    });

    if (!animal) {
      throw new NotFoundException('Animal not found');
    } else {

      await this.prisma.animal.update({
        where: { id: findId },
        data: updateAnimalDto,
      });
      return { message: 'Animal updated successfully' };
    }
  }

  async remove(id: number) {
    const animal = await this.prisma.animal.findUnique({
      where: { id },
    });

    if (!animal) {
      throw new NotFoundException('animal not found');
    } else {
      await this.prisma.animal.delete({
        where: { id },
      });
      return { message: 'animal deleted successfully' };
    }
  }
  async getCount(): Promise<number> {
    const count = await this.prisma.animal.count();
    return count;
  }
}

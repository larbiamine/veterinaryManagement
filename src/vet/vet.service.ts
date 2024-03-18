import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaVet } from './entities/vet.entity';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Injectable()
export class VetService {
    
  constructor(private prisma: PrismaService, private readonly utilitiesService: UtilitiesService) {}

  async findAll(): Promise<PrismaVet[]> {
    const vet = await this.prisma.vet.findMany();
    return vet;
  } 
  async create(createVetDto: CreateVetDto) {
    const { idCardNumber } = createVetDto;
    if (!this.utilitiesService.areAllFieldsStrings(createVetDto, ['id'])) {
      throw new NotFoundException('all fields should be a string');

    }

    const existIdCardNumber = await this.checkifIdCardNumberExist(idCardNumber);

    if (existIdCardNumber) {
      throw new NotFoundException('IdCardNumber already exist');
    }

    const vet = await this.prisma.vet.create({
      data: createVetDto,
    });
    return vet;
  }
  async findOne(id: number): Promise<PrismaVet> {
    const vet = await this.prisma.vet.findUnique({
      where: {
        id: id,
      },
    });
    if (!vet) {
      throw new NotFoundException('Vet not found');
    }

    return vet;
  }
  async delete(id: number): Promise<{ message: string }>{
    const vet = await this.prisma.vet.findUnique({
      where: { id },
    });

    if (!vet) {
      throw new NotFoundException('Vet not found');
    } else {
      await this.prisma.vet.delete({
        where: { id },
      });
      return { message: 'Vet deleted successfully' };
    }
  }
  async update(id: number, updateVetDto: UpdateVetDto): Promise<{ message: string }>{
    if ('id' in updateVetDto) {
      throw new NotFoundException('id cannot be updated');
    }
    const vet = await this.prisma.vet.findUnique({
      where: { id },
    });

    if (!vet) {
      throw new NotFoundException('Vet not found');
    } else {

      const { idCardNumber } = updateVetDto;
      // check if idCardNumber is string

      const existIdCardNumber = await this.checkifIdCardNumberExist(idCardNumber);
  
      if (existIdCardNumber) {
        throw new NotFoundException('IdCardNumber already exist');
      }

      await this.prisma.vet.update({
        where: { id },
        data: updateVetDto,
      });
      return { message: 'Vet updated successfully' };
    }
  }
  private async checkifIdCardNumberExist(icn: string): Promise<boolean> {
    const existingVet = await this.prisma.vet.findMany({
      where: {
        idCardNumber: { equals: icn },
      },
    });

    return existingVet.length > 0;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaOwner } from './entities/owner.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';

@Injectable()
export class ownerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<PrismaOwner[]> {
    const owner = await this.prisma.owner.findMany();
    return owner;
  }
  async create(createOwnerDto: CreateOwnerDto) {
    const { idCardNumber } = createOwnerDto;
    const existIdCardNumber = await this.checkifIdCardNumberExist(idCardNumber);

    if (existIdCardNumber) {
      throw new NotFoundException('IdCardNumber already exist');
    }

    const owner = await this.prisma.owner.create({
      data: createOwnerDto,
    });
    return owner;
  }

  async findOne(id: number): Promise<PrismaOwner> {
    const owner = await this.prisma.owner.findUnique({
      where: {
        id: id,
      },
    });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    return owner;
  }

  async delete(id: number): Promise<{ message: string }>{
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    } else {
      await this.prisma.owner.delete({
        where: { id },
      });
      return { message: 'Owner deleted successfully' };
    }
  }
  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<{ message: string }>{
    const owner = await this.prisma.owner.findUnique({
      where: { id },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    } else {
      await this.prisma.owner.update({
        where: { id },
        data: updateOwnerDto,
      });
      return { message: 'Owner updated successfully' };
    }
  }

  async checkifIdCardNumberExist(icn: string): Promise<boolean> {
    const existingOwner = await this.prisma.owner.findMany({
      where: {
        idCardNumber: { equals: icn },
      },
    });

    return existingOwner.length > 0;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaOwner } from './entities/owner.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ownerService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<PrismaOwner[]>{
        const owner = await this.prisma.owner.findMany();
    
        return owner;
      }
}

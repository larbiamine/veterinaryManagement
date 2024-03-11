import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ownerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';

@Controller('owner')
export class OwnerController {

    constructor(
        private readonly ownerService: ownerService, 
      ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.ownerService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addOwner(@Body() createOwnerDto: CreateOwnerDto) {
      return this.ownerService.create(createOwnerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id:string) {
      const newId = parseInt(id);
      return this.ownerService.findOne(newId);
    }
}

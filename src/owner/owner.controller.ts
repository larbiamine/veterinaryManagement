import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ownerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ParseStringPipe } from 'src/utilities/parseString.pipe';
import { ParseDatePipe } from 'src/utilities/parseDate.pipe';

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

    @UsePipes(new ParseStringPipe(['id']))
    // @UsePipes(new ParseDatePipe([]))
    @UseGuards(JwtAuthGuard)
    @Post()
    async addOwner(@Body() createOwnerDto: CreateOwnerDto) {
      return this.ownerService.create(createOwnerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe)  id:string) {
      const newId = parseInt(id);
      return this.ownerService.findOne(newId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id:string) {
      const newId = parseInt(id);
      return this.ownerService.delete(newId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:string, @Body() updateOwnerDto: UpdateOwnerDto) {
      const newId = parseInt(id);
      return this.ownerService.update(newId, updateOwnerDto);
    }
}

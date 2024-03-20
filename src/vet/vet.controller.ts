import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { UpdateVetDto } from './dto/update-vet.dto';
import { CreateVetDto } from './dto/create-vet.dto';
import { VetService } from './vet.service';
import { ParseStringPipe } from 'src/pipes/parseString.pipe';

@Controller('vet')
export class VetController {
    
    constructor(
        private readonly vetService: VetService, 
      ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.vetService.findAll();
    }
    @Get('count')
    getCount() {
      return this.vetService.getCount();
    }
    @UsePipes(new ParseStringPipe(['id']))
    @UseGuards(JwtAuthGuard)
    @Post()
    async addVet(@Body() createVetDto: CreateVetDto) {
      return this.vetService.create(createVetDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id:number) {
      return this.vetService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id:number) {
      return this.vetService.delete(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:string, @Body() updateVetDto: UpdateVetDto) {
      const newId = parseInt(id);
      return this.vetService.update(newId, updateVetDto);
    }


}

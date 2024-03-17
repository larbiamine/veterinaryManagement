import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {

  }

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    console.log("🆘 || createAnimalDto:", createAnimalDto)
    return this.animalService.create(createAnimalDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe)  id:string) {
    return this.animalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.animalService.remove(+id);
  }
}

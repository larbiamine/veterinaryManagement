import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ParseToStringAndDatePipe } from 'src/utilities/parseToString.service';

@Controller('animal')
export class AnimalController {
  private fieldExceptions: string[];
  constructor(private readonly animalService: AnimalService) {

  }

  @Post()
  create(@Body(new ParseToStringAndDatePipe(['ownerId', 'vetId'])) createAnimalDto: CreateAnimalDto) {
    console.log("🆘 || createAnimalDto:", createAnimalDto)
    return this.animalService.create(createAnimalDto);
  }

  
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.animalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animalService.remove(+id);
  }
}

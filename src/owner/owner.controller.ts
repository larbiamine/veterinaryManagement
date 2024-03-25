import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ownerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { ParseStringPipe } from 'src/pipes/parseString.pipe';
import { ParseIdIntPipe } from 'src/pipes/parseInt.pipe';

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
    @Get('count')
    getCount() {
      return this.ownerService.getCount();
    }

    @UsePipes(new ParseStringPipe(['id']))
    @UsePipes(new ParseIdIntPipe(['id']))
    @UseGuards(JwtAuthGuard)
    @Post()
    async addOwner(@Body() createOwnerDto: CreateOwnerDto) {
      return this.ownerService.create(createOwnerDto);
    }
    


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe)  id:number) {
      return this.ownerService.findOne(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id:number) {
      return this.ownerService.delete(id);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id:number, @Body() updateOwnerDto: UpdateOwnerDto) {
      return this.ownerService.update(id, updateOwnerDto);
    }


    // @Get('example') // This will create an endpoint at /owners/example
    // getExample() {
    //   return 'This is an example endpoint';
    // }
}

import { Controller, Get, Body, Patch, Param, Delete, } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

 
// get env encryption key from .env file

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, 
  ) {}
  
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Get('userEmail/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AES } from 'crypto-js';
import { MyConfigService } from 'src/config/config.service';
 
// get env encryption key from .env file

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly configService: MyConfigService) {}
 
  @Post("register")
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const EncryptionKey = this.configService.getEncryptionKey();
    const encryptedPassword = AES.encrypt(password, EncryptionKey).toString();
    return this.usersService.create({ ...rest, password: encryptedPassword });
  }
  // create(@Body() body: any) {
  //   return this.usersService.create(body);
  // }
  
 
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

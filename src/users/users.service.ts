import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
 

@Injectable()
export class UsersService { 

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto:  CreateUserDto) {
    // const user = new this.userModel(createUserDto);
    // return user.save();
    return createUserDto;
 
  }

  findAll() {
     
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | string> {
    const user = await this.userModel.findOne({_id:id}).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }

  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | string> {
    const exitingUser = await this.userModel
      .findByIdAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true })
      .exec();
    if (!exitingUser) {
      throw new NotFoundException(`user ${id} not found`);
     
    }  
    return exitingUser;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}

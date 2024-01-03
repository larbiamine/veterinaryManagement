import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
 

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    
    const { username, email} = createUserDto;
    const existByEmail = await this.checkifEmailExist(email);
    const existByUsername = await this.checkifUsernameExist(username);
    
    if (existByEmail) {
      throw new NotFoundException('Email already exist');
    }
    if (existByUsername) {
      throw new NotFoundException('Username already exist');
    }
    const user = new this.userModel(createUserDto);
    return user.save();
 
  }

  findAll() {
     
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ _id: id })
      .select('-password')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }
  async findByUserName(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({username:username}).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | string> {
    const { username = '', email = ''} = updateUserDto;
    if (username !== '') {
      const existByUsername = await this.checkifUsernameExist(username);
      if (existByUsername) {
        throw new NotFoundException('Username already exist');
      }
    }
    if (email !== '') {
      const existByEmail = await this.checkifEmailExist(email);
      if (existByEmail) {
        throw new NotFoundException('Email already exist');
      }
    }
    
    
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

  async getUserByEmail(email: string): Promise<User | string> {
    const user = await this.userModel
      .findOne({ email: email })
      .select('-password')
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }
  async checkifEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      return false;
    } else {
      return true;
    }
  }
  async checkifUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      return false;
    } else {
      return true;
    }

  }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUser, User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  constructor(private prisma: PrismaService) {}

  // async create(createUserDto: CreateUserDto) {
  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const existByEmail = await this.checkifEmailExist(email);
    const existByUsername = await this.checkifUsernameExist(username);

    if (existByEmail) {
      throw new NotFoundException('Email already exist');
    }
    if (existByUsername) {
      throw new NotFoundException('Username already exist');
    }

    const data = createUserDto;
    data.isAdmin = false;

    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }
  async createAdmin(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    const existByEmail = await this.checkifEmailExist(email);
    const existByUsername = await this.checkifUsernameExist(username);

    if (existByEmail) {
      throw new NotFoundException('Email already exist');
    }
    if (existByUsername) {
      throw new NotFoundException('Username already exist');
    }

    const data = createUserDto;
    data.isAdmin = true;

    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async findAll(): Promise<PrismaUser[]>{
    const users = await this.prisma.user.findMany();

    return users;
  }

  async findOne(id: string): Promise<User | null> {
    return null;
  }
  async findByUserName(username: string): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username ,
      },
    });
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    return 'false';
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id ,
      },
    });

    console.log("🆘 || user:", user)
    return "removed";



    try {
      await this.prisma.user.delete({
        where: {
          id: id ,
        },
      });
      return `success: user with id ${id} has been deleted`
    } catch (error) {
      return `error: user with id ${id} not found`
    }  

  }

  async getUserByEmail(email: string): Promise<PrismaUser | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email ,
      },
    });
    return user;
  }
  async checkifEmailExist(email: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findMany({
      where: {
        email: { equals: email },
      },
    });

    return existingUser.length > 0;
  }
  async checkifUsernameExist(username: string): Promise<boolean> {
    const existingUser = await this.prisma.user.findMany({
      where: {
        username: { equals: username },
      },
    });
    return existingUser.length > 0;
  }
}

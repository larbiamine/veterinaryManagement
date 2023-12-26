import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import {AES} from 'crypto-js';
import { MyConfigService } from 'src/config/config.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: MyConfigService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result} = user;
            return result
        }
        return null;
    }
    async login(user: any) {
        const payload = {username : user.username, sub: user.userId}
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async register(createUserDto: CreateUserDto){
        const { password, ...rest } = createUserDto;
        const EncryptionKey = this.configService.getEncryptionKey();
        const encryptedPassword = AES.encrypt(password, EncryptionKey).toString();
        const user = await this.usersService.create({ ...rest, password: encryptedPassword });
        return user;
    }
}

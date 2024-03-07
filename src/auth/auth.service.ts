import { Injectable } from '@nestjs/common';

import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import {AES, enc} from 'crypto-js';
import { MyConfigService } from 'src/config/config.service';
import { MyJwtService } from 'src/jwt/jwt.service';
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private myJwtService: MyJwtService,
        private readonly configService: MyConfigService
    ) {}

    async validateUser(username: string, password: string): Promise<Prisma.UserCreateInput | null> {
        
        const user = await this.usersService.findByUserName(username);        
        const EncryptionKey = this.configService.getEncryptionKey();
        const decryptedPassword = AES.decrypt(user.password, EncryptionKey).toString(enc.Utf8);
        
        if (user && decryptedPassword === password) {
            return user;
        }
        return null;
    }
    async login(user: any) {
        const payload = {username : user.username, id: user.id, isAdmin: user.isAdmin}
        console.log("🆘 || file: auth.service.ts:33 || payload:", payload)
        return {
            token: await this.myJwtService.generateToken(payload)
        };


    }


    async register(createUserDto: CreateUserDto){
        const { password, ...rest } = createUserDto;
        const EncryptionKey = this.configService.getEncryptionKey();
        const encryptedPassword = AES.encrypt(password, EncryptionKey).toString();
        const user = await this.usersService.create({ ...rest, password: encryptedPassword });
        return user;
    }
    async registerAdmin(createUserDto: CreateUserDto){
        const { password, ...rest } = createUserDto;
        const EncryptionKey = this.configService.getEncryptionKey();
        const encryptedPassword = AES.encrypt(password, EncryptionKey).toString();
        const user = await this.usersService.createAdmin({ ...rest, password: encryptedPassword });
        return user;
    }
}

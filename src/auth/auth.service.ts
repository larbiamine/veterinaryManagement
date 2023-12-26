import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import {AES, enc} from 'crypto-js';
import { MyConfigService } from 'src/config/config.service';
@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private readonly configService: MyConfigService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        
        const user = await this.usersService.findByUserName(username);        
        const EncryptionKey = this.configService.getEncryptionKey();
        const decryptedPassword = AES.decrypt(user.password, EncryptionKey).toString(enc.Utf8);
        
        if (user && decryptedPassword === password) {
            return {id: user._id.toString(), username: user.username, email: user.email};
        }
        return null;
    }
    async login(user: any) {
        const payload = {username : user.username, sub: user.id}


        console.log("🆘 || file: auth.service.ts:30 || payload:", payload)

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

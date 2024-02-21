import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { MyJwtService } from 'src/jwt/jwt.service';
import { RolesType } from 'src/types/roles.types';



export const Roles = (roles: RolesType) => SetMetadata('roles', roles);
@Injectable()
// use this guard to protect routes that require a valid JWT token using the @UseGuards decorator
export class JwtAuthGuard implements CanActivate {
  constructor(private myJwtService: MyJwtService,  private reflector: Reflector) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<RolesType>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('Authorization');
    const token = authorization?.split(' ')[1];
    try {
      const auth = await this.myJwtService.verifyToken(token);
      
      if (roles && roles.admin && !auth.isAdmin) {
        throw new UnauthorizedException('User is not admin');
      }
      
      return true; 
    } catch (error) {
      
      throw new UnauthorizedException('Invalid token');
    }
  }
}

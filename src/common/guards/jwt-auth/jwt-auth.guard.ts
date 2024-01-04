import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { MyJwtService } from 'src/jwt/jwt.service';

@Injectable()
// use this guard to protect routes that require a valid JWT token using the @UseGuards decorator
export class JwtAuthGuard implements CanActivate {
  constructor(private myJwtService: MyJwtService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.header('Authorization');
    const token = authorization?.split(' ')[1];
    try {
      const auth = await this.myJwtService.verifyToken(token);
      
      return true; 
    } catch (error) {
      
      throw new UnauthorizedException('Invalid token');
    }
  }
}

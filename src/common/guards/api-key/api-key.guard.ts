import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { MyJwtService } from 'src/jwt/jwt.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // constructor(private myJwtService: MyJwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const request = context.switchToHttp().getRequest<Request>();
    // const authorization = request.header('Authorization');
    // const token = authorization?.split(' ')[1];
    // const auth = this.myJwtService.verifyToken(token);

    // console.log("🆘 || file: api-key.guard.ts:13 || authorization:", auth);

    return true;
  }
}

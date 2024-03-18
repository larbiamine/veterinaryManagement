import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaForeignKeyExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();

    console.log('🆘 || exception:', exception);

    switch (exception.code) {
      case 'P2002': {
        const key = exception.meta.target;
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Unique key ${key.toString()} constraint violated. Please provide valid foreign key values.`,
          error: 'Bad Request',
        });
        break;
      }
      case 'P2003': {
        const key = exception.meta.field_name;
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Foreign key ${key.toString()} constraint violated. Please provide valid foreign key values. `,
          error: 'Bad Request',
        });
        break;
      }
      default: {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          error: 'Internal Server Error',
        });
        break;
      }
    }
  }
}

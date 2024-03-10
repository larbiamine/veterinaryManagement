import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ownerService } from './owner.service';

@Controller('owner')
export class OwnerController {

    constructor(
        private readonly ownerService: ownerService, 
      ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.ownerService.findAll();
    }
}

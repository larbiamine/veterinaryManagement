import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ParseIdIntPipe } from 'src/pipes/parseInt.pipe';
import { ParseStringPipe } from 'src/pipes/parseString.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ParseDatePipe } from 'src/pipes/parseDate.pipe';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';

@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly appointmentService: AppointmentService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseStringPipe(['id',"ownerId", "vetId", "animalId"]))
    @UsePipes(new ParseIdIntPipe(['id', "ownerId", "vetId"]))
    @UsePipes(new ParseDatePipe([], 'date'))
    create(@Body() createAppointmentDto: CreateAppointmentDTO) {
        return this.appointmentService.create(createAppointmentDto);
    }
}

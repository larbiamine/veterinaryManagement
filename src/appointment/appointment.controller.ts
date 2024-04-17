import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ParseIdIntPipe } from 'src/pipes/parseInt.pipe';
import { ParseStringPipe } from 'src/pipes/parseString.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ParseDatePipe } from 'src/pipes/parseDate.pipe';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { changeDateInput, setStatusInput } from './entities/appointment.entity';
import { ParseStatusPipe } from 'src/pipes/parseStatus.pipe';

@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly appointmentService: AppointmentService
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    getAll() {
        return this.appointmentService.getAll();
    }

    @Get("vet/:vetId")
    @UseGuards(JwtAuthGuard)
    getVetAppointments(@Param('vetId', ParseIntPipe) vetId: number,) {
        return this.appointmentService.getVetAppointments(vetId);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseStringPipe(['id',"ownerId", "vetId", "animalId"]))
    @UsePipes(new ParseIdIntPipe(['id', "ownerId", "vetId"]))
    @UsePipes(new ParseDatePipe([], 'date'))
    create(@Body() createAppointmentDto: CreateAppointmentDTO) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Patch('changeDate/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseIdIntPipe(['id']))
    @UsePipes(new ParseDatePipe([], 'date'))
    changeDate(@Param('id', ParseIntPipe) id: number, @Body() data: changeDateInput) {
        const {date} = data;
        return this.appointmentService.changeDate(id, date);
        
    }

    @Patch('setStatus/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseIdIntPipe(['id']))
    @UsePipes(new ParseStatusPipe())
    setStatus(@Param('id', ParseIntPipe) id: number, @Body() data: setStatusInput) {
        const { status } = data;
        return this.appointmentService.setStatus(id, status);
    }

}

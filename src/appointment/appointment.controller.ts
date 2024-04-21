import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ParseIdIntPipe } from 'src/pipes/parseInt.pipe';
import { ParseStringPipe } from 'src/pipes/parseString.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { ParseDateObjectPipe } from 'src/pipes/parseDateObject.pipe';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { PrismaAppointment, changeDateInput, setStatusInput } from './entities/appointment.entity';
import { ParseStatusPipe } from 'src/pipes/parseStatus.pipe';
import { ParseDatePipe } from 'src/pipes/parseDate.pipe';
import { AppointmentStatus } from '@prisma/client';

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

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseIdIntPipe(['id']))
    findOne(@Param('id', ParseIntPipe) id: number):Promise<PrismaAppointment | string>{
        return this.appointmentService.findOne(id);
    }

    @Get('date/:date')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseDatePipe())
    getAppointmentsByDate(@Param('date') date: Date):Promise<PrismaAppointment[] | string> {
        return this.appointmentService.getAppointmentsByDate(date);
    }



    @Get("vet/:vetId")
    @UseGuards(JwtAuthGuard)
    getVetAppointments(@Param('vetId', ParseIntPipe) vetId: number,) {
        return this.appointmentService.getVetAppointments(vetId);
    }
    @Get("animal/:animalId")
    @UseGuards(JwtAuthGuard)
    getAnimalAppointments(@Param('animalId', ParseIntPipe) animalId: number,) {
        return this.appointmentService.getAnimalAppointments(animalId);
    }
    @Get("owner/:ownerId")
    @UseGuards(JwtAuthGuard)
    getOwnerAppointments(@Param('ownerId', ParseIntPipe) ownerId: number,) {
        return this.appointmentService.getOwnerAppointments(ownerId);
    }
    @Get("status/:status")
    @UseGuards(JwtAuthGuard)
    getAppointmentsByStatus(@Param('status') status: AppointmentStatus) {
        return this.appointmentService.getAppointmentsByStatus(status);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseStringPipe(['id',"ownerId", "vetId", "animalId"]))
    @UsePipes(new ParseIdIntPipe(['id', "ownerId", "vetId"]))
    @UsePipes(new ParseDateObjectPipe([], 'date'))
    create(@Body() createAppointmentDto: CreateAppointmentDTO) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseIdIntPipe(['id']))
    delete(@Param('id', ParseIntPipe) id: number){
        return this.appointmentService.delete(id);
    }


    @Patch('changeDate/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ParseIdIntPipe(['id']))
    @UsePipes(new ParseDateObjectPipe([], 'date'))
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

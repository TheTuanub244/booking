import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/createSession.dto';
import { Session } from './session.schema';
import { ObjectId } from 'mongoose';

@Controller('session')
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }
    @Post()
    async create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
        return this.sessionService.createSession(createSessionDto);
    }
    @Get(':id')
    async getSession(@Body() id: any): Promise<Session | null> {
        return this.sessionService.getSession(id);
    }
    @Post(':id')
    async updateSession(@Body() session: any) {
        return this.sessionService.updateSession(session);
    }
    @Delete(':id')
    async deleteSession(@Body() session: any) {
        return this.sessionService.deleteSession(session);
    }
    @Get('/getSessionByUser/:id')
    async getSessionByUser(@Param('id') id: string) {
        return this.sessionService.getSessionByUserId(id)
    }
    @Post('/:id/lastViewProperties')
    async updateLastPropertyView(@Param('id') id: ObjectId, @Body() property: any) {
        return this.sessionService.updateLastPropertyView(id, property.data)
    }
}

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
    @Get('/getSession/:id')
    async getSession(@Body() id: any): Promise<Session | null> {
        return this.sessionService.getSession(id);
    }
    @Post('/update/:id')
    async updateSession(@Body() session: any) {

        console.log(session);

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
    @Post('/sign-out')
    async signOut(@Body() data: any) {
        return this.sessionService.signOut(data.userId)
    }
    @Get('/getRecentSearch/:id')
    async getRecentSearch(@Param('id') id: ObjectId) {
        return this.sessionService.getRecentSearch(id)
    }
    @Get('/getSessionHistory/:id')
    async getSessionHistory(@Param('id') id: ObjectId) {
        return this.sessionService.getSessionHistory(id)
    }
    @Post('/refreshAccessToken/:id')
    async refreshAccessToken(@Param('id') id: ObjectId, @Body() data: any) {
        console.log(data);

        return this.sessionService.refreshAccessToken(id, data.accessToken)
    }
}

import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ObjectId } from 'mongoose';
import { ValidateTokenGuard } from 'src/common/guards/validateToken.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLE } from 'src/user/enum/role.enum';

@Controller('property')
export class PropertyController {
    constructor(private readonly propertyService: PropertyService) { }
    @Post('/createProperty')
    async createNewProperty(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertyService.createNewProperty(createPropertyDto);
    }
    @Get('/getAllProperty')
    async getAllProperty() {
        return this.propertyService.getAllProperty();
    }
    @Post('/getPropetyWithOwner')
    async getPropetyWithOwner(@Body() owner_id: any) {
        return this.propertyService.getPropertyWithOwner(owner_id.owner_id);
    }
    @UseGuards(ValidateTokenGuard)
    @Get('/getPropertyById/:id')
    async getPropertyById(@Param('id') id: ObjectId) {
        return this.propertyService.getPropertyById(id);
    }
    @Get('getPropertiesSortedByRate')
    async getPropertiesSortedByRate() {
        return this.propertyService.getPropertiesSortedByRate();
    }
    @Post('getPropertyTypesByPlace')
    async getPropertyTypesByPlace(@Body() place: any) {
        return this.propertyService.getPropertyTypesByPlace(place.place);
    }
    @Post('getPropertyByTypeAndPlace')
    async getPropertyByTypeAndPlace(@Body() data: any) {
        return this.propertyService.getPropertyByTypeAndPlace(
            data.place,
            data.type,
        );
    }
    @Get('getAllTypeOfProperties')
    async getAllTypeOfProperties() {
        return this.propertyService.getAllTypeOfProperties();
    }
    @Post('getPropertyNear')
    async getPropertyNear(@Body() data: any, @Req() req: Request) {

        return this.propertyService.getPropertyNear(data.longitude, data.latitude);
    }
    @UseGuards(RolesGuard, ValidateTokenGuard)
    @Roles(ROLE.PARTNER, ROLE.ADMIN)
    @Put('updateImageForProperty')
    async updateImageForProperty(@Body() data: any) {
        return this.propertyService.updateImageForProperty(
            data.propertyId,
            data.image,
        );
    }
    @Post('getPropertyByPlace')
    async getPropertyByPlace(@Body() data: any) {
        return this.propertyService.getPropertyByPlace(data.place);
    }
    @Get('getDistinctPlace')
    async getDistinctPlace() {
        return this.propertyService.getDistinctPlace()
    }
}

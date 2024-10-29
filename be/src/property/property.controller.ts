import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ObjectId } from 'mongoose';

@Controller('property')
export class PropertyController {
    constructor(
        private readonly propertyService: PropertyService
    ) { }
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
        return this.propertyService.getPropertyWithOwner(owner_id.owner_id)
    }
    @Post('/getPropertyById/:id')
    async getPropertyById(@Param('id') id: ObjectId) {
        return this.propertyService.getPropertyById(id)
    }
    @Get('getPropertiesSortedByRate')
    async getPropertiesSortedByRate() {
        return this.propertyService.getPropertiesSortedByRate()
    }
    @Post('getPropertyTypesByPlace')
    async getPropertyTypesByPlace(@Body() place: any) {
        return this.propertyService.getPropertyTypesByPlace(place.place)
    }
    @Post('getPropertyByTypeAndPlace')
    async getPropertyByTypeAndPlace(@Body() data: any) {
        return this.propertyService.getPropertyByTypeAndPlace(data.place, data.type)
    }
    @Get('getAllTypeOfProperties')
    async getAllTypeOfProperties() {
        return this.propertyService.getAllTypeOfProperties()
    }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createProperty.dto';

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
    async getPropertyById(@Param('id') id: string) {
        return this.propertyService.getPropertyById(id)
    }
    @Post('getPropertiesSortedByRate')
    async getPropertiesSortedByRate() {
        return this.propertyService.getPropertiesSortedByRate()
    }

}

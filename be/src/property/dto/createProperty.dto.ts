export class CreatePropertyDto {
    owner_id: string
    name: string
    description: string
    address: {
        province: string;
        district: string;
        ward: string;
        street: string
    }
    property_type: string

    rate: number
}
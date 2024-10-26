import { Body, Controller, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { FindRoomDto } from './dto/findRoom.dto';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) { }
  @Post('createRoom')
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.createRoom(createRoomDto);
  }
  @Post('getRoomWithProperty')
  async getRoomWithProperty(@Body() property_id: any) {
    return this.roomService.getRoomWithProperty(property_id.property_id);
  }
  @Post('findRoom')
  async findRoom(@Body() findRoomDto: FindRoomDto) {
    return this.roomService.findRoom(findRoomDto);
  }
  @Post('findRoomWithProperty')
  async findRoomWithSearch(@Body() data: any) {
    const { province, check_in, check_out, capacity } = data

    return this.roomService.findAvailableRoomWithSearch(province, check_in, check_out, capacity);
  }
  @Post('findAvailableRoomForBooking')
  async findAvailableRoomForBooking(@Body() data: any) {
    return this.roomService.findAvailableRoomForBooking(
      data.room_id,
      data.property_id,
      data.check_in,
      data.check_out,
      data.capacity,
    );
  }
}

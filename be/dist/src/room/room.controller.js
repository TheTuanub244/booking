"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const room_service_1 = require("./room.service");
const createRoom_dto_1 = require("./dto/createRoom.dto");
const findRoom_dto_1 = require("./dto/findRoom.dto");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../user/enum/role.enum");
const validateToken_guard_1 = require("../common/guards/validateToken.guard");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async createRoom(createRoomDto) {
        return this.roomService.createRoom(createRoomDto);
    }
    async getRoomWithProperty(property_id) {
        return this.roomService.getRoomWithProperty(property_id.property_id);
    }
    async findRoom(findRoomDto) {
        return this.roomService.findRoom(findRoomDto);
    }
    async findAvailableRoomWithSearch(data) {
        return this.roomService.findAvailableRoomWithSearch(data.userId, data.place || data.province, data.check_in, data.check_out, data.capacity);
    }
    async updateImageForRoom(data) {
        return this.roomService.updateImageForRoom(data.roomId, data.image);
    }
};
exports.RoomController = RoomController;
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, validateToken_guard_1.ValidateTokenGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.ROLE.PARTNER, role_enum_1.ROLE.ADMIN),
    (0, common_1.Post)('createRoom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRoom_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Post)('getRoomWithProperty'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomWithProperty", null);
__decorate([
    (0, common_1.Post)('findRoom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findRoom_dto_1.FindRoomDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findRoom", null);
__decorate([
    (0, common_1.Post)('findAvailableRoomWithSearch'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "findAvailableRoomWithSearch", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, validateToken_guard_1.ValidateTokenGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.ROLE.PARTNER, role_enum_1.ROLE.ADMIN),
    (0, common_1.Put)('updateImageForRoom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateImageForRoom", null);
exports.RoomController = RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
//# sourceMappingURL=room.controller.js.map
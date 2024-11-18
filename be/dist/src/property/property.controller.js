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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const property_service_1 = require("./property.service");
const validateToken_guard_1 = require("../common/guards/validateToken.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../user/enum/role.enum");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = __importDefault(require("multer"));
let PropertyController = class PropertyController {
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    async createPropertyWithPartner(data, files) {
        const propertyImage = files.find((file) => file.fieldname === 'image');
        const roomImages = files.filter((file) => file.fieldname.startsWith('rooms'));
        const propertyData = {
            ...data,
            image: propertyImage ? propertyImage.path : null,
            address: JSON.parse(data.address),
            location: JSON.parse(data.location),
            rooms: typeof data.rooms === 'string' ? JSON.parse(data.rooms) : data.rooms,
            roomImages: roomImages.map((file) => ({
                path: file.path,
                fieldname: file.fieldname,
            })),
        };
        return this.propertyService.createNewProperty(propertyData);
    }
    async updatePropertyWithPartner(data, files) {
        const propertyImage = files.filter((file, idx) => file.fieldname === `image[${idx}]`);
        const roomImages = files.filter((file) => file.fieldname.startsWith('rooms'));
        if (propertyImage.length !== 0) {
            const propertyData = {
                ...data,
                image: propertyImage.map((image) => image.path),
                address: JSON.parse(data.address),
                location: JSON.parse(data.location),
                rooms: typeof data.rooms === 'string' ? JSON.parse(data.rooms) : data.rooms,
            };
            propertyData.rooms = propertyData.rooms.map((room, index) => {
                const imagesForRoom = roomImages
                    .filter((file, idx) => file.fieldname === `rooms[${index}]image[${idx}]`)
                    .map((file) => ({
                    path: file.path,
                    fieldname: file.fieldname,
                }));
                return {
                    ...room,
                    image: imagesForRoom,
                };
            });
            return this.propertyService.updateProperty(propertyData);
        }
        else {
            const propertyData = {
                ...data,
                address: JSON.parse(data.address),
                location: JSON.parse(data.location),
                rooms: typeof data.rooms === 'string' ? JSON.parse(data.rooms) : data.rooms,
            };
            return this.propertyService.updateProperty(propertyData);
        }
    }
    async getAllProperty() {
        return this.propertyService.getAllProperty();
    }
    async getPropetyWithOwner(id, page = 1, limit = 5) {
        return this.propertyService.getPropertyWithOwner(id, page, limit);
    }
    async getPropertyById(id) {
        return this.propertyService.getPropertyById(id);
    }
    async getPropertiesSortedByRate() {
        return this.propertyService.getPropertiesSortedByRate();
    }
    async getPropertyTypesByPlace(place) {
        return this.propertyService.getPropertyTypesByPlace(place.place);
    }
    async getPropertyByTypeAndPlace(data) {
        return this.propertyService.getPropertyByTypeAndPlace(data.place, data.type);
    }
    async getAllTypeOfProperties() {
        return this.propertyService.getAllTypeOfProperties();
    }
    async getPropertyNear(data) {
        return this.propertyService.getPropertyNear(data.longitude, data.latitude);
    }
    async updateImageForProperty(data) {
        return this.propertyService.updateImageForProperty(data.propertyId, data.image);
    }
    async getPropertyByPlace(data) {
        return this.propertyService.getPropertyByPlace(data.place);
    }
    async getDistinctPlace() {
        return this.propertyService.getDistinctPlace();
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)('/createPropertyWithPartner'),
    (0, common_1.UseGuards)(validateToken_guard_1.ValidateTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.ROLE.ADMIN, role_enum_1.ROLE.PARTNER),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: multer_1.default.memoryStorage(),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "createPropertyWithPartner", null);
__decorate([
    (0, common_1.Post)('/updatePropertyWithPartner'),
    (0, common_1.UseGuards)(validateToken_guard_1.ValidateTokenGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.ROLE.ADMIN, role_enum_1.ROLE.PARTNER),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: multer_1.default.memoryStorage(),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "updatePropertyWithPartner", null);
__decorate([
    (0, common_1.Get)('/getAllProperty'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getAllProperty", null);
__decorate([
    (0, common_1.Get)('/getPropetyWithOwner/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropetyWithOwner", null);
__decorate([
    (0, common_1.Get)('/getPropertyById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertyById", null);
__decorate([
    (0, common_1.Get)('getPropertiesSortedByRate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertiesSortedByRate", null);
__decorate([
    (0, common_1.Post)('getPropertyTypesByPlace'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertyTypesByPlace", null);
__decorate([
    (0, common_1.Post)('getPropertyByTypeAndPlace'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertyByTypeAndPlace", null);
__decorate([
    (0, common_1.Get)('getAllTypeOfProperties'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getAllTypeOfProperties", null);
__decorate([
    (0, common_1.Post)('getPropertyNear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertyNear", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard, validateToken_guard_1.ValidateTokenGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.ROLE.PARTNER, role_enum_1.ROLE.ADMIN),
    (0, common_1.Put)('updateImageForProperty'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "updateImageForProperty", null);
__decorate([
    (0, common_1.Post)('getPropertyByPlace'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getPropertyByPlace", null);
__decorate([
    (0, common_1.Get)('getDistinctPlace'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PropertyController.prototype, "getDistinctPlace", null);
exports.PropertyController = PropertyController = __decorate([
    (0, common_1.Controller)('property'),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map
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
exports.BookingController = void 0;
const common_1 = require("@nestjs/common");
const booking_service_1 = require("./booking.service");
let BookingController = class BookingController {
    constructor(bookingService) {
        this.bookingService = bookingService;
    }
    async createBooking(createBookingDto) {
        return this.bookingService.createBooking(createBookingDto);
    }
    async getMonthlyRevenue(id) {
        return this.bookingService.getMonthlyRevenueByOwner(id);
    }
    async getMonthlyRevenueByProperty(id) {
        return this.bookingService.getMonthlyRevenueByProperty(id);
    }
    async getBookingByOwner(id) {
        return this.bookingService.getBookingByOwner(id);
    }
    async cancelBooking(id) {
        return this.bookingService.cancelBooking(id);
    }
    async confirmCancellation(booking_id, redirect, res) {
        try {
            const success = await this.bookingService.finalizeCancellation(booking_id);
            if (success) {
                return res.redirect(`${redirect}?status=success`);
            }
            else {
                return res.redirect(`${redirect}?status=failure`);
            }
        }
        catch (error) {
            return res.redirect(`${redirect}?status=error`);
        }
    }
    async findUnfinishedBooking(userId) {
        return this.bookingService.findUnfinishedBooking(userId);
    }
};
exports.BookingController = BookingController;
__decorate([
    (0, common_1.Post)('createBooking'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)(`/getMonthlyRevenue/:id`),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getMonthlyRevenue", null);
__decorate([
    (0, common_1.Get)(`/getMonthlyRevenueByProperty/:id`),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getMonthlyRevenueByProperty", null);
__decorate([
    (0, common_1.Get)(`/getBookingByOwner/:id/`),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "getBookingByOwner", null);
__decorate([
    (0, common_1.Delete)('/cancelBooking/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "cancelBooking", null);
__decorate([
    (0, common_1.Get)('confirm-cancellation'),
    __param(0, (0, common_1.Query)('booking_id')),
    __param(1, (0, common_1.Query)('redirect')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "confirmCancellation", null);
__decorate([
    (0, common_1.Get)(`/findUnfinishedBooking/:userId`),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookingController.prototype, "findUnfinishedBooking", null);
exports.BookingController = BookingController = __decorate([
    (0, common_1.Controller)('booking'),
    __metadata("design:paramtypes", [booking_service_1.BookingService])
], BookingController);
//# sourceMappingURL=booking.controller.js.map
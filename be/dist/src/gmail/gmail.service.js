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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GmailService = void 0;
const common_1 = require("@nestjs/common");
const mail_1 = __importDefault(require("@sendgrid/mail"));
let GmailService = class GmailService {
    constructor() {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
    }
    async sendEmail(to, subject, text, html) {
        const msg = {
            to: 'tuanub244@gmail.com',
            from: 'khuatvanviet17@gmail.com',
            subject,
            text,
            html,
        };
        try {
            const response = await mail_1.default.send(msg);
            return response;
        }
        catch (error) {
            console.error('Error sending email:', error.response?.body || error.message);
            throw error;
        }
    }
};
exports.GmailService = GmailService;
exports.GmailService = GmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GmailService);
//# sourceMappingURL=gmail.service.js.map
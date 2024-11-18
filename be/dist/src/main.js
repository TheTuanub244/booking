"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validation_pipe_1 = require("@nestjs/common/pipes/validation.pipe");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validation_pipe_1.ValidationPipe());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'https://booking-app-1edf4.web.app');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });
    app.enableCors({
        origin: [
            'https://booking-app-1edf4.web.app',
            'http://localhost:3000',
            'http://192.169.101.137:3000',
        ],
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map
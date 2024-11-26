import { PaymentService } from './payment.service';
import { Request, Response } from 'express';
export declare class PaymentController {
    private readonly paymentSevice;
    constructor(paymentSevice: PaymentService);
    savePayment(body: any, req: Request, res: Response): Promise<void>;
    createPaymentUrl(body: any, req: Request, res: Response): Promise<void>;
    vnpayReturn(query: any, res: Response): Promise<any>;
    vnpayIpn(query: any, res: Response): Promise<void>;
    private sortObject;
}

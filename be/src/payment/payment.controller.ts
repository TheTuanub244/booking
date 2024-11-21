import { Controller, Post, Body, Req, Res, Query, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import moment from 'moment';
import { config } from 'dotenv';
import qs from 'qs';
import crypto from 'crypto';

config(); // Load environment variables

@Controller('payment')
export class PaymentController {
  
  @Post('create_payment')
  async createPaymentUrl(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const date = new Date();
    const createDate = moment(date).format('YYYYMMDDHHmmss');

    // Lấy IP address của người dùng
    const ipAddr =
      req.headers['x-forwarded-for']?.toString() ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection as any).socket?.remoteAddress ||
      '';

    const tmnCode = process.env.vnp_TmnCode2 || '';
    const secretKey = process.env.vnp_HashSecret2 || '';
    const vnpUrl = process.env.vnp_Url || '';
    const returnUrl = process.env.vnp_ReturnUrl || '';

    const orderId = moment(date).format('DDHHmmss');
    const amount = Number(body.amount); // Lấy số tiền từ body
    const bankCode = req.body.bankCode; // Mã ngân hàng (mặc định NCB)

    const locale = body.language || 'en'; // Ngôn ngữ mặc định là tiếng Anh
    const currCode = 'VND'; // Mã tiền tệ mặc định là VND

    // Tạo tham số cho VNPAY
    const vnp_Params: { [key: string]: string | number } = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: `Thanh toan cho ma GD:${orderId}`,
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100, // Số tiền phải nhân với 100
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    if (bankCode) {
      vnp_Params['vnp_BankCode'] = bankCode; // Thêm mã ngân hàng vào tham số
    }

    // Sắp xếp tham số
    const sortedParams = this.sortObject(vnp_Params);

    // Tạo chữ ký
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Gắn chữ ký vào tham số
    sortedParams['vnp_SecureHash'] = signed;

    // Tạo URL chuyển hướng
    const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;
    res.redirect(paymentUrl);
  }


  @Get('vnpay_ipn')
  async vnpayIpn(@Query() query: any, @Res() res: Response) {
    const vnp_Params = query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    const rspCode = vnp_Params['vnp_ResponseCode'];

    // Xóa SecureHash và SecureHashType khỏi tham số
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    // Sắp xếp các tham số
    const sortedParams = this.sortObject(vnp_Params);

    // Lấy secretKey từ biến môi trường
    const secretKey = process.env.VNP_HASHSECRET || '';

    // Tạo chuỗi để ký
    const signData = qs.stringify(sortedParams, { encode: false });

    // Tạo chữ ký HMAC
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    // Giả sử đây là trạng thái của giao dịch
    const paymentStatus = '0'; // Trạng thái mặc định, giao dịch chưa được xử lý

    const checkOrderId = true; 
    const checkAmount = true; 
    if (secureHash === signed) {
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus === '0') { 
            if (rspCode === '00') {
              res.status(200).json({ RspCode: '00', Message: 'Success' });
            } else {
              // Thanh toán thất bại
              // Cập nhật trạng thái thanh toán thất bại vào CSDL
              res.status(200).json({ RspCode: '00', Message: 'Success' });
            }
          } else {
            // eslint-disable-next-line prettier/prettier
            res.status(200).json({ RspCode: '02', Message: 'This order has been updated to the payment status' });
          }
        } else {
          res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
        }
      } else {
        res.status(200).json({ RspCode: '01', Message: 'Order not found' });
      }
    } else {
      res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
  }

  // Hàm sắp xếp object
  private sortObject(obj: { [key: string]: any }): { [key: string]: any } {
    const sorted: { [key: string]: any } = {};
    const keys = Object.keys(obj).sort(); // Lấy các keys và sắp xếp
    keys.forEach((key) => {
      sorted[key] = obj[key]; // Sắp xếp lại theo thứ tự
    });
    return sorted;
  }
}

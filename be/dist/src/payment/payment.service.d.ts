import { GmailService } from 'src/gmail/gmail.service';
export declare class PaymentService {
  private readonly gmailService;
  constructor(gmailService: GmailService);
  savePayment(data: any): Promise<void>;
}

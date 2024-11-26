import { Injectable } from '@nestjs/common';
import { GmailService } from 'src/gmail/gmail.service';

@Injectable()
export class PaymentService {
    constructor(
        private readonly gmailService: GmailService
    ){}
}

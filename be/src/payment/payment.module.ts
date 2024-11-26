import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './payment.schema';
import { GmailService } from 'src/gmail/gmail.service';
import { GmailModule } from 'src/gmail/gmail.module';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, GmailService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
    ]),
    GmailModule
  ],
})
export class PaymentModule {}

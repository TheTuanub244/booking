import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';
@Injectable()
export class GmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Lấy từ file .env
  }

  async sendEmail(to: string, subject: string, text: string, html: string) {
    const msg = {
      to: 'tuanub244@gmail.com',
      from: 'khuatvanviet17@gmail.com', 
      subject,
      text,
      html,
    };
    try {
      const response = await sgMail.send(msg);

      return response;
    } catch (error) {
      console.error(
        'Error sending email:',
        error.response?.body || error.message,
      );
      throw error;
    }
  }
}

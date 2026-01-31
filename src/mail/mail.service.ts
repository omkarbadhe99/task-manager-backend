import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(to: string, name: string, token: string) {
    await this.mailerService.sendMail({
      to:"omkarabadhe99@gmail.com",
      from:"omkarabadhe99@gmail.com",
      subject: 'Welcome! Confirm your Email',
      template: 'confirmation', // template filename
      context: { // data passed to template
        name,
        token,
      },
    });
  }
}

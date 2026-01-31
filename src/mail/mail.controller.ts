
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

  @Post('send')
 async sendEmail(@Body() body: { email: string; name: string }) {
    const token = Math.random().toString(36).substring(2, 8);
    await this.mailService.sendUserConfirmation(body.email, body.name, token);
    return { message: 'Email sent successfully!' };
  }

}

import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Module({
 imports: [
    MailerModule.forRootAsync({
      useFactory: async () => {
        // create a test account (Ethereal)
        const nodemailer = require('nodemailer');
        const testAccount = await nodemailer.createTestAccount();

        return {
          transport: {
            host: 'smtp.gmail.com',
            
           
            auth: {
              user: "omkarabadhe99@gmail.com",
              pass: "Omkar@1999",
            },
          },
         
          template: {
            dir: join(process.cwd(), 'src', 'template', 'email'),
            adapter: new HandlebarsAdapter(),
            options: { strict: true },
          },
        };
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}

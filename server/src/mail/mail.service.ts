import { Injectable } from '@nestjs/common';
import { JobsOptions, Queue } from 'bullmq';
import { EMAIL_QUEUE, PasswordChangedMail, ResetPasswordMail, VerifyEmailMail, WellComeMail } from './constants.js';
import { InjectQueue } from '@nestjs/bullmq';


@Injectable()
export class MailService
{
    private readonly jobOptions: JobsOptions = {
        attempts: 3,
        backoff: {
            type: 'exponential', // now correctly narrowed via JobsOptions typing
            delay: 5000,
        },
        removeOnComplete: true,
        removeOnFail: false,
    };

    constructor ( @InjectQueue( EMAIL_QUEUE ) private readonly mailQueue: Queue ) { }

    async sendWelcomeMail ( email: string, name: string )
    {
        await this.mailQueue.add(
            WellComeMail,
            { email, name },
            this.jobOptions,
        );
    }

    async sendVerifyEmailMail ( email: string, otp: string )
    {
        await this.mailQueue.add(
            VerifyEmailMail,
            { email, otp },
            this.jobOptions,
        );
    }

    async sendResetPasswordMail ( email: string, link: string )
    {
        await this.mailQueue.add(
            ResetPasswordMail,
            { email, link },
            this.jobOptions,
        );
    }

    async sendPasswordChangedMail ( email: string )
    {
        await this.mailQueue.add(
            PasswordChangedMail,
            { email },
            this.jobOptions,
        );
    }

}

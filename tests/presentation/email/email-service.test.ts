import  nodemailer from "nodemailer"
import { EmailService, SendEmailOptions } from "../../../src/presentation/email/email-service"

describe("email-service.ts", () => {

    const mockSendEmail = jest.fn()

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    })

    //Variables
    const emailService = new EmailService()

    test("Should send email", async () => {


        const options: SendEmailOptions = {
            to: "jmcadevtesting@gmail.com",
            subject: "test",
            htmlBody: "<h1>Test</h1>"
        }

        await emailService.sendEmail(options)

        expect(mockSendEmail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "test",
            to: "jmcadevtesting@gmail.com",
        })

    })

    test("Should send email with attachements", async () => {

        const email = "jmcadevtesting@gmail.com"

        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendEmail).toHaveBeenLastCalledWith({
            attachments: expect.arrayContaining([
                {filename: "logs-all.log", path: "./logs/logs-all.log"},
                {filename: "logs-high.log", path: "./logs/logs-high.log"},
                {filename: "logs-medium.log", path: "./logs/logs-medium.log"}
            ]),
            html: expect.any(String),
            subject: "Logs del servidor",
            to: email,
        })

    })

})
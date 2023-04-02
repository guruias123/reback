import nodemailer from 'nodemailer';

let mailTransporter = nodemailer.createTransport({
    service: 'hostinger',
    // host: "smtp.mailtrap.io",
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        // user: 'rienzecv@gmail.com',
        // // pass: 'ijsesbqkzkkiadwe'
        // pass:'xyz@97262'
        user: 'mail@ganeshswami.gs',
        pass: 'mail@2345Z'
    }
});
 
const email = (otp, mail) => {
    let mailDetails = {
        // process.env.MAIL_ID                                                                                                                                                                                                                            
        from: "mail@ganeshswami.gs",  
        to: mail,
        subject: 'Verification Mail',
        text: `OTP - ${otp}`
    };
    console.log({mail})
    return mailDetails;
}

 
const sendMail = async(otp, mail) => await mailTransporter.sendMail(email(otp, mail), function(err, data) {
    if(err) {
        console.log(err)
        console.log('Error Occurs');
    } else {
        // console.log('Email sent successfully', {data});
        return 'Email sent successfully'
    }
});

export default sendMail;


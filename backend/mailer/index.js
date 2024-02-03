const nodemailer = require('nodemailer');

const mailer = (reciever,body) =>{
    console.log(reciever);
    const emailConfig = {
        user: 'nec.staff.attendance@gmail.com', 
        pass: 'qjdcecvlfottrnhl', 
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailConfig.user,
            pass: emailConfig.pass,
        },
    });  
    const mailOptions = {
        from: emailConfig.user,
        to: '21it027@nandhaengg.org',
        subject: 'Leave Requested',
        text: body,
    };    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error.message);
        } else {
            console.log('Email sent successfully:', info.response);
        }
        transporter.close();
    });    
}

module.exports = mailer;
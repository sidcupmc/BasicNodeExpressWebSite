/**
 * Logic for sending message via email
 */
var nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

class PostMessageService {
  async postMessage(name, subject, email, message) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "floyd666uk@gmail.com",
        pass: "qbjo xwxv msij mkuq",
      },
    });

    // point to the template folder
    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };

    // use a template file with nodemailer
    transporter.use("compile", hbs(handlebarOptions));

    var mailOptions = {
      from: email,
      to: "mail@mikeclarke.co.uk",
      subject: "Contact Form Message From Mike Clarke CV Site",
      template: "email",
      context: {
        name: name,
        subject: subject,
        email: email,
        message: message,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = PostMessageService;

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
/**
 * Class contains features for out apis to handel pagiantion and limitation and sorting.
 * @class Email
 */

class Email {
  /**
   * Create a APIFeatures object.
   * @constructor
   * @param {mongodb_user} mongodb_Object - The user you want to send him your email.
   * @param {url_string} string - the url string that you want the user to go to it it do an action
   * @returns {void}
   */
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.additionalData.firstName;
    this.url = url;
    this.from = `Muhammad Alaa <${process.env.EMAIL_FROM}>`;
  }

  /* istanbul ignore next */
  /**
   * @summary the function that handle configuration use the server to send the email
   * @returns {nodemailer_Transport} this function return a nodemailer_Transport that have premesstion from server to send emails
   */
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  /**
   * @summary the function that handle email containt and view
   * @param {template} html_page - A template that the email containt take to looks good for User Interface
   * @param {subject} string - The subject that the email that you want to send talikng about
   * @returns {void}
   */

  /* istanbul ignore next */
  // Send the actual email
  async send(template, subject) {
    if (process.env.NODE_ENV === 'test') {
      if (!process.env.TEST_REJECT) return;
      else return Promise.reject(new Error('fail'));
    }

    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });
    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    if (process.env.NODE_ENV === 'development') return;
    await this.newTransport().sendMail(mailOptions);
  }

  /**
   * @summary the function that send a welcome email to user when join our app
   */

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Symphonia Family!');
  }

  /**
   * @summary the function that send Artist Application email if a user want to become an artist
   */
  async sendArtistApplication() {
    await this.send('artist', 'You are applying to be an artist!');
  }

  /* istanbul ignore next */
  /**
   * @summary the function that send user token to user to be preimum for android
   */
  async sendPremiumToken() {
    await this.send('premium', 'You are applying to be an premium user!');
  }
  /**
   * @summary the function that send user an email contains token to reset his password .
   */

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 1 hour)'
    );
  }
}
module.exports = Email;

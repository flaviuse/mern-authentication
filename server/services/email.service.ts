import sgMail from "@sendgrid/mail";
const host = process.env.HOST;
const sendingEmail = process.env.SENDING_EMAIL;

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const createResetPasswordEmail = (
  receiverEmail: string,
  resetTokenValue: string
): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Reset password link",
    text: "Some useless text",
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
  <a href="http://${host}/login/reset/${resetTokenValue}">http://${host}/login/reset/${resetTokenValue}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
  };

  return email;
};

export const createResetConfirmationEmail = (receiverEmail: string): sgMail.MailDataRequired => {
  const email: sgMail.MailDataRequired = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Your password has been changed",
    text: "Some useless text",
    html: `<p>This is a confirmation that the password for your account ${receiverEmail} has just been changed. </p>`,
  };

  return email;
};

export const createVerificationEmail = (
  receiverEmail: string,
  verificationTokenValue: string
): sgMail.MailDataRequired => {
  const email = {
    to: receiverEmail,
    from: `${sendingEmail}`,
    subject: "Email Verification",
    text: "Some uselss text",
    html: `<p>Please verify your account by clicking the link: 
  <a href="http://${host}/account/confirm/${verificationTokenValue}">http://${host}/account/confirm/${verificationTokenValue}</a> </p>`,
  };

  return email;
};

export const sendEmail = async (email: sgMail.MailDataRequired) => sgMail.send(email);

export default {
  createResetPasswordEmail,
  createResetConfirmationEmail,
  createVerificationEmail,
  sendEmail,
};

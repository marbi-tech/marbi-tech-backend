import sgMail from "@sendgrid/mail";

import ENV from "../constants/env";

interface Variables {
  fullName: string;
  email: string;
  message: string;
  phone?: string | null;
}

//  this sends auto alert email to marbi tech team
const sendContactAlertEmail = async (variables: Variables) => {
  sgMail.setApiKey(ENV.SENDGRID_API_KEY as string);

  const receiverEmail = ENV.SENDGRID_SENDER_EMAIL;

  if (!receiverEmail) return;

  return sgMail.send({
    from: ENV.SENDGRID_SENDER_EMAIL as string,
    templateId: ENV.SENDGRID_CONTACT_ALERT_EMAIL_TEMPLATE_ID as string,
    personalizations: [
      {
        to: receiverEmail,
        dynamicTemplateData: {
          ...variables,
        },
      },
    ],
  });
};

export default sendContactAlertEmail;

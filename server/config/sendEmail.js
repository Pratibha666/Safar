import SibApiV3Sdk from 'sib-api-v3-sdk';

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const sendEmail = async ({ to, subject, html }) => {
  try {
    await emailApi.sendTransacEmail({
      sender: {
        name: 'Safar',
        email: 'pratibha.yadav1128@gmail.com' 
      },
      to: [{ email: to }],
      subject,
      htmlContent: html
    });
  } catch (error) {
    console.error('Brevo Email Error:', error);
    throw error;
  }
};

export default sendEmail;
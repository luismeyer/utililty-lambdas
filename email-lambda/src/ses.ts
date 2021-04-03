import AWS from "aws-sdk";
AWS.config.update({ region: "eu-central-1" });

type CreateEmailParams = {
  sender: string;
  receiver: string;
  subject: string;
  text: string;
};

export const createEmailParams = (params: CreateEmailParams) => ({
  Destination: {
    CcAddresses: [],
    ToAddresses: [params.receiver],
  },
  Message: {
    Body: {
      Text: {
        Charset: "UTF-8",
        Data: params.text,
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: params.subject,
    },
  },
  Source: params.sender,
  ReplyToAddresses: [],
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export const sendEmail = (params: AWS.SES.SendEmailRequest) => {
  return ses.sendEmail(params).promise();
};

import { APIGatewayProxyHandlerV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { createEmailParams, sendEmail } from "./ses";

const createResponse = (
  statusCode: number,
  data: string
): APIGatewayProxyResultV2 => ({
  statusCode,
  body: JSON.stringify({
    data,
  }),
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const { body } = event;

  if (!body) {
    return createResponse(404, "Missing body");
  }

  const bodyObject = JSON.parse(body);

  const { sender, receiver, subject, text } = bodyObject;

  if (!sender || !receiver || !subject || !text) {
    return createResponse(
      404,
      "Missing value in body (sender, receiver, text and subject are needed)"
    );
  }

  const emailParams = createEmailParams({
    sender,
    receiver,
    subject,
    text,
  });

  return sendEmail(emailParams)
    .then((res) => createResponse(200, `Success ${res.MessageId}`))
    .catch((error) => createResponse(500, error));
};

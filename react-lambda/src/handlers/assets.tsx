import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import { resolve, extname } from "path";
import mime from "mime-types";
import { clientOutDir } from "../config.json";

export const handleRequest: APIGatewayProxyHandler = async ({ path }) => {
  const filePath = resolve(__dirname, `../../${clientOutDir}${path}`);

  const file = readFileSync(filePath).toString();
  const mimetype = mime.contentType(extname(filePath));

  return {
    statusCode: 200,
    headers: { "Content-Type": mimetype },
    body: file,
  };
};

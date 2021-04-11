import { APIGatewayProxyHandler } from "aws-lambda";
import { readFileSync } from "fs";
import ReactServerDOM from "react-dom/server";
import { resolve } from "path";
import { App } from "../app";
import { clientOutDir } from "../config.json";

export const handleRequest: APIGatewayProxyHandler = async () => {
  console.log("start");

  const app = ReactServerDOM.renderToString(<App />);

  const indexFile = readFileSync(
    resolve(__dirname, `../../${clientOutDir}/index.html`)
  ).toString();

  const html = indexFile.replace(
    '<div id="root"></div>',
    `<div id="root">${app}</div>`
  );

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: html,
  };
};

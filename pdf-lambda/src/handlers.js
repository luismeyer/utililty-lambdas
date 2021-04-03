"use strict";
const awsChromium = require("chrome-aws-lambda");

const { atob, btoa } = require("./utils");

const DEFAULT_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
};

const getHtmlInput = ({ body, queryStringParameters, isBase64Encoded }) => {
  if (queryStringParameters && queryStringParameters.html) {
    return queryStringParameters.html;
  }

  if (body) {
    const { html } = JSON.parse(isBase64Encoded ? atob(body) : body);
    return html;
  }
};

module.exports.api = async (event) => {
  const html = getHtmlInput(event);

  if (!html) {
    return {
      statusCode: 400,
      headers: { ...DEFAULT_HEADERS, "Content-type": "application/json" },
      body: JSON.stringify({
        message: "Missing html input",
      }),
    };
  }

  const browser = await awsChromium.puppeteer.launch({
    args: awsChromium.args,
    defaultViewport: awsChromium.defaultViewport,
    executablePath: await awsChromium.executablePath,
    headless: true,
  });

  try {
    console.info("Opening HTML File...");
    const page = await browser.newPage();
    await page.goto(`data:text/html,${html}`, { waitUntil: "networkidle2" });

    console.info("Printing PDF...");
    const buffer = await page.pdf({ format: "A4" });

    console.info("Cleanup...");
    await browser.close();

    return {
      statusCode: 200,
      headers: { ...DEFAULT_HEADERS, "Content-type": "application/pdf" },
      body: btoa(buffer),
      isBase64Encoded: true,
    };
  } catch (e) {
    console.error("Error while rendering PDF: ", e);
    await browser.close();

    return {
      statusCode: 400,
      headers: { ...DEFAULT_HEADERS, "Content-type": "application/json" },
      body: JSON.stringify({
        message: "Error while rendering pdf",
      }),
    };
  }
};

# Pdf λ

AWS Lambda that converts Html to Pdf

## Installation

Setup dependencies:

```bash
yarn
```

## Development

Start the serverless offline server

```bash
yarn dev
```

## Usage

Send a POST Request to the Lambda using a body like this:

```javascript
{
    "html": "<html></html>",
}
```

Or a GET Request with the html string attached to the URL as a query string: `/endpoint?html=<html></html>`

<br>
The function will return a json containing the pdf as a b64.

```javascript
{
    "data": "<b64 encoded pdf file>",
}
```

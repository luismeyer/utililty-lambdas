# Email λ

AWS Lambda that sends plain text emails using ses

## Installation

Setup dependencies:

```bash
yarn
```

## Usage

Send a Post Request to the Lambda using a body like this:

```javascript
{
  "sender": "sender@email.com",
  "receiver": "sender@email.com",
  "subject": "Message Subject",
  "text": "Email raw text"
}
```

The function will return a json containing the pdf as a b64.

```javascript
{
    "data": "Success message",
}
```

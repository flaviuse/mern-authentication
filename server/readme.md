## BACKEND SETUP

This API uses SendGrid to send emails. Make sure to have a sendgrid account to use this boilerplate.

### Environment Variables.

You need to setup the following environmental variables :

DB, for db URL

PORT, (default is 3000)

SESSION_KEY, Key string

SENDGRID_API_KEY, from Sendgrid dashboard

HOST, is client host ex: localhost:3000 or your heroku url. if you use localhost modify cors.js file from https to htpp.


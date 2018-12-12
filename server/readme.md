## BACKEND SETUP

This API uses SendGrid to send emails. Make sure to have a sendgrid account to use this boilerplate.

The folder is ready to push on heroku, check heroku doc for deployement : 

https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app

### Environment Variables you will need.

set env variables on heroku with 'heroku config:set VAR=VALUE'

You need to setup the following environmental variables :

DB, for db URL

PORT, (default is 3000)

SESSION_KEY, Key string

SENDGRID_API_KEY, from Sendgrid dashboard

HOST, is client host ex: localhost:3000 or your heroku url. if you use localhost modify cors.js file from https to htpp.

you can also use config module to run it localy, check : https://www.npmjs.com/package/config


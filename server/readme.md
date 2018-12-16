# :rocket: Back-end Setup

This API uses SendGrid to send emails. Make sure to have a sendgrid account to use this boilerplate.

## :heavy_check_mark: Local

To try locally, create a .env file with the environment variables needed :

DB=mongodb://localhost/boilerplate

HOST=localhost:3000

SENDGRID_API_KEY=YOUR_KEY_HERE

SESSION_KEY=YOUR_KEY_HERE

Be awared that the emails sent via sendgrid give links in https that doesn't work locally. 

You have to delete the 's' to use the links from an email or change it on the routes/auth.js.

## :heavy_check_mark: Deployment

The back-end is ready to push on heroku, check heroku doc for deployement : 

https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app

## :heavy_check_mark: Environment Variables 

set env variables on heroku with 'heroku config:set VAR=VALUE'

You need to setup the following environmental variables :

DB, for db URL

SESSION_KEY, Key string

SENDGRID_API_KEY, from Sendgrid dashboard

HOST, is client host ex: localhost:3000 or your heroku url. if you use localhost modify cors.js file from https to htpp.

you can also use config module to run it localy, check : https://www.npmjs.com/package/config


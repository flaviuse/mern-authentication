## BACKEND SETUP

This API uses SendGrid to send emails. Make sure to have a sendgrid account to use this boilerplate.

## Setup

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### Install MongoDB

To run this project, you need to install the latest version of MongoDB Community Edition first.

https://docs.mongodb.com/manual/installation/

Once you install MongoDB, make sure it's running. (run mongod in terminal)

You can use MongoDB Compass to visualize the database.

https://www.mongodb.com/products/compass

### Install the Dependencies

Next, from the project folder, install the dependencies:

    npm i

### Use "config" to run localy without env variables.

Default variables are provided. You need to fill the sendgrid API key needed to send emails.

### If you want to use Environment Variables.

You need to setup the following environmental variables :
DB, for db URL
PORT, ex: 3000
SESSION_KEY, Key string
SENDGRID_API_KEY, from Sendgrid dashboard
HOST, is client host ex: localhost:3000

### Start the Server

    npm start

This will launch the Node server on port 3900. If that port is busy, you can set a different point in config/default.json.

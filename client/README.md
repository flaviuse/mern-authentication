# :rocket: Introduction

This is the frontend part (React/Redux) for the boilerplate. Based on create-react-app boilerplate

# :heavy_check_mark: Features:

Login with forget password feature, Register with email verification (token based).

# :heavy_check_mark: Local

To try locally create a file ".env.development" in the root of the client folder and add the needed env variables.

REACT_APP_API_URL=http://localhost:3900/api

REACT_APP_CAPTCHA_KEY=PUT_YOUR_KEY_HERE

REACT_APP_SENTRY=PUT_YOUR_KEY_HERE

then execute npm start (make sure the server part is running).

# :heavy_check_mark: Build

install dependencies with 'npm i' then run 'npm build'.

To deploy on heroku (install heroku CLI)  use  'heroku create APP_NAME --buildpack mars/create-react-app --region eu'


# :heavy_check_mark: Environmental variables:

Setup the environmental variables on heroku cli with 'heroku config:set VAR=VALUE' or directly on the website.

The variables needed are :

REACT_APP_API_URL=   API_URL ending with route /api.

REACT_APP_CAPTCHA_KEY, Google captcha key needed, you need to autorise the client url on google dashboard to use it.

REACT_APP_SENTRY, Sentry key to report bugs on sentry.

then execute 'heroku open' to get redirected to the app.


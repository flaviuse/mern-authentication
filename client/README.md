# Introduction

This is the frontend React/Redux for the boilerplate. Based on create-react-app boilerplate

# Features:

Login with forget password feature, Register with email verification (token based).

# Build

install dependencies with 'npm i' then run 'npm build'.

To deploy on heroku (install heroku CLI)  use  'heroku create APP_NAME --buildpack mars/create-react-app --region eu'


# Env variables:

set env variables on heroku with 'heroku config:set VAR=VALUE'

The env variables needed are :

REACT_APP_API_URL=   API_URL .com/api 

REACT_APP_CAPTCHA_KEY, Google captcha key needed, you need to autorise the client url on google dashboard to use it.

REACT_APP_SENTRY, Sentry key to report bugs on sentry.

then 'heroku open'


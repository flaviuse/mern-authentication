# Introduction

This is the frontend React/Redux for the boilerplate. Based on create-react-app boilerplate

# Features:

Login with forget password feature, Register with email verification (token based).

# Usage

The project use react-create-app, the following scripts are available with npm:
"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"

# Env variables:

Make sur to use env variables with process.env.""
and import them on heroku when building the app on heroku.

The env variables needed are :
REACT_APP_API_URL=http://localhost:3900/api (default) set your heroku app on .env.production .
CAPTCHA_KEY, Google captcha key needed, you need to autorise localhost on google dashboard to use it localy.
SENTRY, Sentry key to report bugs on sentry.

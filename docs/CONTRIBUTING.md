# Contribution Guidelines

In order to locally build Athenian web app image, and run it, run:

```bash
$ docker build --tag=athenian-app .
$ docker run --rm --publish=8080:80 --name=athenian-app athenian-app
```

Then you can open http://localhost:8080 in your browser, and see the Athenian web app.


## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Requirements

- Install [Node.js](https://nodejs.org) (v10+) and [Yarn](https://yarnpkg.com/en/docs/install) (v1+).


### Available Scripts

In the project directory, you can run:

- `yarn install`: Install webapp dependencies for the very first time,
- `yarn start`: Runs the webapp in the development mode under http://localhost:3000. The page will hot-reload on every edits, and lint errors will appear in the console,
- `yarn test`: Runs the app tests in interactive watch mode,


### Auth0 and GitHub App local testing

For locally testing the authentication, you need to configure Auth0 and GitHub to work together. Follow these steps or refer to Auth0 and GitHub docs.

#### 1. Register Single-Page Applications in Auth0 ([docs](https://auth0.com/docs/dashboard/guides/applications/register-app-spa))

1. Create an Auth0 account,
2. Create an application with "Application Type" set to "Single Page Application", using the following settings (eventually change the port with the one you plan to use):
    - "Allowed Callback URLs": `http://localhost:3000`
    - "Allowed Web Origins": `http://localhost:3000`
    - "Allowed Logout URLs": `http://localhost:3000/logout`

#### 2. Connect your Auth0 app to a GitHub OAuth App ([docs](https://auth0.com/docs/connections/social/github))

1. Register a new OAuth App in GitHub,  with these settings:
    - "Homepage URL": `http://localhost:3000`
    - "Authorization callback URL": `https://<auth0 domain>/login/callback` (e.g., `your-app.eu.auth0.com`)
2. Enable the connection with GitHub from your Auth0 Dashboard providing the `Client ID` and `Client Secret` of the GitHub OAuth App from the previous step, and ask for these permissions:
    - `repo:user`

#### 3. Configure Athenian App

Update the [`config.js`](https://github.com/athenianco/athenian-webapp/blob/master/public/config.js) file by setting both `auth.domain` and `auth.clientId` with the corresponding values of the Auth0 application.

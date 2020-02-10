window.ENV = {
  auth: {
    "domain": "yourtenant.auth0.com",
    "clientId": "your-cliend-id",
    "redirectUri": "http://localhost:3000/login/callback",
    "logoutRedirectUri": "http://localhost:3000",
    "audience": "https://yourtenant.auth0.com/api/v2/"
  },
  api: {
    "basePath": "http://localhost:8080/v1"
  },
  application: {
    "githubAppUri": "https://github.com/apps/athenian-owl"
  }
};

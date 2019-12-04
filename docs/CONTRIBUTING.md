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
- `yarn build`: Builds the app for production to the `build` folder, optimizing the build for the best performance. The build is minified and the filenames include the hashes.

# Contribution Guidelines

In order to locally build Athenian web app image, and run it, run:

```bash
$ docker build --tag=athenian-app .
$ docker run --rm --publish=8080:80 --name=athenian-app athenian-app
```

Then you can open http://localhost:8080 in your browser, and see the Athenian web app.

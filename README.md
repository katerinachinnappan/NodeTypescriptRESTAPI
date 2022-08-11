# A Vue3 Typescript Web App

This is a simple web app which consumes the Articles API (please clone and run locally).

## Before setup

Since this is a very simple REST API, we are not using a containerized postgres database. The data returned by the endpoints is generated with a simple python script.
There are currently 15 articles generated.

```
python3 util/generateArticles.py
```

The article data is stored under `src/data/articles.json`

## Project setup

```
npm install
```

### Compile

```
npm run build
```

### Start API

```
npm run dev
```

### Format files

```
npx prettier --write .
```

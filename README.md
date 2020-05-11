# Asteroids

## Features

⚡️ Deploy a full-featured production-ready web application in less than 60 seconds.

🔐 Allow users to sign up and log in with an email and password, view their profiles and data, and log out. Outputs feedback for loading and errors states to enhance UX.

📃 Includes a splash page, login page, sign up page, and dashboard.

🤖‍‍ Includes wired up forms, queries, mutations, snackbars, and more commonly used components.

☁️ [Zero Config Deployments](https://zeit.co/blog/zero-config). It just works 🔥

## Quick Start

Clone the repository

Install dependencies, then run the development server:

```bash
yarn
yarn dev
```

# Deploy

Deploy to the cloud with [now](https://zeit.co/now) ([download](https://zeit.co/download))

Install the `now` CLI

```bash
npm install --global now
```

Then deploy using

```bash
now
```

# Tech stack

🤖 [Typescript](https://www.typescriptlang.org) - static types, used throughout the client and server.

🌚 [Next 9.3](https://github.com/zeit/next.js) - server-side rendering, file-based routing in the `pages` directory, and serverless build of of graphql API within `pages/api/graphql.ts` using [API Routes](https://github.com/zeit/next.js#api-routes).

🦋 [Apollo](https://www.apollographql.com/docs/react/hooks-migration/) (React Hooks API) - GraphQL client for queries and mutations.

💅 [Ant Design](https:/ant.design) - Beautiful, responsive, easy-to-use components.

▲ [ZEIT now](https://now.sh) - serverless monorepo deployment.

🌪️[Hasura](https://hasura.io) - Realtime GraphQL API on top of postgres

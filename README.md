## Getting Started

1. First, install Next.js:

```bash
npm install next@latest react@latest react-dom@latest
```

2. Create an `.env.local` file and copy and paste the variables from `.env.defaults.` Fill in the values as appropriate.

3. For use of the Compost Chatbot, install openai:

```bash
npm install openai
```

Then generate a secret key on your [OpenAI](https://openai.com/api/) account to access the API. Insert the key into your .env.local file.

4. For use of the Map-View Donation Finder, install the leaflet library and its React wrapper:

```bash
npm install leaflet react-leaflet
```

As well as leaflet types for TypeScript and icons:

```bash
npm install -D @types/leaflet

npm install leaflet-defaulticon-compatibility
```

5. To start the frontend of the app, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# About the Template

## Mantine Next.js template

This is a template for [Next.js](https://nextjs.org/) pages router + [Mantine](https://mantine.dev/).
If you want to use app router instead, see [next-app-template](https://github.com/mantinedev/next-app-template).

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Jest](https://jestjs.io/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier

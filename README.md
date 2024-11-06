# js-monorepo-template

A monorepo template for JavaScript/TypeScript projects.

## What's inside?

This monorepo includes the following packages/apps:

### Apps and Packages

#### Frontend Apps

- `admin`: a [Refine](https://refine.dev) app for the admin dashboard
- `desktop`: an [Electron](https://www.electronjs.org/) app for the desktop client app
- `docs`: a [Docusaurus](https://docusaurus.io/) app for the documentation
- `mobile`: an [Expo](https://expo.dev/) app for the mobile client app
- `web`: a [Next.js](https://nextjs.org/) app for the web client app
- `website`: an [Astro](https://astro.build/) app for the project website

#### Backend Apps

- `users`: a [Hono](https://hono.dev/) app for the user management service

#### Infrastructure Apps

- `api`: a [CDK](https://www.terraform.io/cdktf) app for the infrastructure as code

#### Packages

- `ui`: a React component library shared by applications, packed with [Storybook](https://storybook.js.org/) for visual documentation.
- `config`: a shared configuration package (tsconfig, eslint, prettier, etc.)

### Utilities

This monorepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://jestjs.io/) for testing
- [Vitest](https://vitest.dev/) for unit testing
- [Playwright](https://playwright.dev/) for browser automation and testing
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [pnpm](https://pnpm.io/) for package management
- [Turbo](https://turbo.build/repo) for monorepo management
- [Commitlint](https://commitlint.js.org/) for commit message linting
- [Husky](https://typicode.github.io/husky) for Git hooks
- [lint-staged](https://www.npmjs.com/package/lint-staged) for running linters on staged files
- [Conventional Commits](https://www.conventionalcommits.org/) for commit message conventions
- [Changesets](https://github.com/changesets/changesets) for changelog and version management
- [Renovate](https://www.mend.io/renovate/) for automated dependency updates

### Install

To install all dependencies, run the following command:

```bash
pnpm install
```

### Build

To build all apps and packages, run the following command:

```bash
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm dev
```

### Lint and Format

To lint all apps and packages, run the following command:

```bash
pnpm lint
```

To format all apps and packages, run the following command:

```bash
pnpm format
```

### Test

To run all tests, run the following command:

```bash
pnpm test
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```bash
pnpx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
pnpx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

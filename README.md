# BC POC

Developer experience first, extremely flexible code structure and only keep what you need:

### Features

- ⚡ [Vite](https://vite.dev/) - Next generation frontend tooling
- 🖖 [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- 🌏 [Axios](https://axios-http.com/) - Promise based HTTP client
- ☂️ [TanStack Query](https://tanstack.com/query/latest) - Powerful asynchronous state management for TS/JS
- 🧭 [Vue Router](https://router.vuejs.org/) - The official router for Vue.js
- 🍍 [Pinia](https://pinia.vuejs.org/) - The Vue Store that you will enjoy using
- ⚙️ [pnpm](https://pnpm.io) - A strict and efficient alternative to npm with up to 3x faster performance
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org)
- ✅ Strict Mode for TypeScript and Vue 3
- 🌐 Multi-language (i18n) with [Vue I18n](https://vue-i18n.intlify.dev/)
- ⌨️ Form handling with [Vee-Validate](https://vee-validate.logaretm.com/)
- 🔴 Validation library with [Zod](https://zod.dev/)
- 📏 Linter with [ESLint](https://eslint.org)
- 💖 Code Formatter with [Prettier](https://prettier.io)
- 🦊 Husky for Git Hooks
- 🚫 Lint-staged for running linters on Git staged files
- 🚓 Lint git commit with [Commitlint](https://commitlint.js.org/)
- 💡 Absolute Imports using `@` prefix
- 🎭 [Headless UI Vue](https://headlessui.com/vue/menu) - Unstyled, fully accessible UI components
- 🎨 [Class Variance Authority](https://cva.style/) - For building type-safe component variants
- 🎯 [Lucide Vue Next](https://lucide.dev/) - Beautiful & consistent icon toolkit
- 🗂 VSCode configuration: Debug, Settings, Tasks and Extensions

### Requirements

- Node.js 22+ and npm

## Getting Started

First, run the development server:

```bash
npm install
```

## Run dev

```bash
npm run dev
```

## Run build

```bash
npm run build
```

## Run preview

It is important to note that vite preview is intended for previewing the build locally and not meant as a production server.

```bash
npm run preview
```

Open [http://localhost:5173/](http://localhost:5173/) with your browser to see the result.

## Commit Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commitlint will automatically check your commit messages to ensure they follow the correct format.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies
- `ci`: Changes to our CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

### Examples

```bash
# Good commit messages
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login button styling issue"
git commit -m "docs: update README with installation steps"
git commit -m "refactor: improve error handling in upload service"

# Bad commit messages (will be rejected)
git commit -m "update code"
git commit -m "fix bug"
git commit -m "WIP: working on feature"
```

### Commit with Scope (Optional)

You can optionally include a scope to provide additional contextual information:

```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(upload): handle file size validation"
git commit -m "refactor(router): simplify route configuration"
```

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── assets                      # Assets folder
│   ├── components                  # Vue components
│   │   ├── atoms                   # are the basic building blocks of all matter
│   │   ├── molecules               # are groups of two or more atoms held together by chemical bonds
│   │   ├── organisms               # are assemblies of molecules functioning together as a unit
│   │   ├── pages                   # are page-level objects that place components into a layout and articulate the design's underlying content structure.
│   │   └── templates               # are specific instances of templates that show what a UI looks like with real representative content in place
│   ├── composables                 # Vue composables (custom hooks)
│   ├── constants                   # Constants folder
│   ├── libs                        # 3rd party libraries configuration
│   ├── locales                     # i18n translation files
│   ├── queries                     # contain all tanstack query
│   ├── router                      # defined routes of application
│   ├── services                    # API services
│   ├── stores                      # Pinia stores
│   ├── styles                      # Styles folder
│   ├── types                       # Type definitions
│   ├── utils                       # Utilities folder
│   └── views                       # Page views/components
├── vite.config.ts                  # Vite configuration
└── tsconfig.json                   # TypeScript configuration
```

# Reapp Mobile App

> [Versão em Português](README.pt.md)

## Setup Environment to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/ReappMobi/reapp-mobile
cd reapp-mobile
```

### 2. Install Node, Yarn, and Dependencies

Make sure you have `nvm` (Node Version Manager) and `corepack` installed.

```sh

nvm use               # Installs correct node version
corepack use yarn     # Installs the correct Yarn version
yarn                  # Installs dependencies
```

### 3. Set Up Expo and Java

Read the [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment).

- Use **Development builds** — **do not use Expo Go**
- For Android builds, use **Java SDK 17**

### 4. Run the App

```sh
yarn expo prebuild        # Creates binary directories
yarn expo run:android     # Runs on Android
yarn expo run:ios         # Runs on iOS
```

---

## Commits

Any commit that affects the project significantly (new features, bug fixes, dependency updates, business logic changes, etc.) should be made on a **new branch** and later merged into `main`.

Avoid committing directly to the `main` branch. This helps keep the code stable and organized.

## Branch Naming

- `feature`: for adding, refactoring, or removing a feature
- `bugfix`: for fixing bugs
- `test`: for experimenting outside a specific task

### Examples

To add, refactor, or remove a feature:

```bash
git checkout -b feature/create-button-component
```

To fix a bug:

```bash
git checkout -b bugfix/button-not-working-iphone
```

To run experiments:

```bash
git checkout -b test/new-hover-effect
```

---

## Portuguese Version

[Voltar para a versão em português](README.pt.md)

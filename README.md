# Reapp Frontend

## New commits

New commits that have the potential to impact the project, such as adding features, fixing bugs, updating dependencies, changing business logic, among others, should be submitted in a new branch and later integrated through the merge process. It is imperative to avoid committing directly to the main branch, thus ensuring a more controlled and stable code management.

## branch names

`feature`:  used to add, refactor, or remove a feature.

`bugfix`: used to fix a bug.

`test`: used to experiment outside of a specific problem/task.

#### Examples

You need to add, refactor, or remove a feature:

- `git branch feature/create-new-button-component`

You need to fix a bug:

- `git branch bugfix/button-not-working-iphone`

You need to perform experiments:

- `git branch test/apply-new-hover-effect`

## Running Locally

Clone the project

```bash
  git clone [link-projeto]
```

Go to the project directory

```bash
  cd reaap-frontend
```

Install dependencies

```bash
  npm install
```

Run the project

```bash
  npm run start
```

# Astro Starter Kit: Minimal

The tool should represent a caste family tree with 72 nodes, where each node represents a primary family branch. Upon clicking on a node, it should expand to show the surnames associated with that branch, along with their respective deity and gotra information.

## How it works

There are JSON file under *assets/json* folder, which contains information about different branches of Indian families, their Gotras (ancestral lineage), associated deities, and common surnames.

Each entry includes:

- Branch Name: The name of the family branch.
- Gotra: The ancestral lineage associated with the branch.
- Deity: The deity that the branch worships.
- Surnames: A list of common surnames associated with the branch.

example json

```json
[
  {
      "Branch_Name": "base name",
      "Gotra": "gotra name",
      "Deity": "gotra deity",
      "Location": "gotra origin",
      "Surnames": [
        "surname 1", "surname2"
      ]
  },
]
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

1. clone the [repo](https://github.com/recursivezero/assignment.git)
2. Navigate to the project folder `cd assignment`
3. Open the project in your IDE.
4. Open **index.html** to see the project in action.


## Screenshots

![p1](https://github.com/user-attachments/assets/d6cfc92e-8ca0-473d-a181-7bfd9d6c40f3)

![p2](https://github.com/user-attachments/assets/2d7ca095-6360-4255-9009-9ef7d0aae84f)

![p3](https://github.com/user-attachments/assets/232f3783-581c-4aeb-8738-d440399923b5)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

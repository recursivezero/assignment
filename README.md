# SocieTree: Internship assignment

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

## How to start

1. clone the [repo](https://github.com/recursivezero/assignment.git)
2. Navigate to the project folder `cd assignment`
3. Open the project in your IDE.
4. Open **index.html** to see the project in action.


## Screenshots

![p1](https://github.com/user-attachments/assets/d6cfc92e-8ca0-473d-a181-7bfd9d6c40f3)

![p2](https://github.com/user-attachments/assets/2d7ca095-6360-4255-9009-9ef7d0aae84f)

![p3](https://github.com/user-attachments/assets/232f3783-581c-4aeb-8738-d440399923b5)

## Tech Stacks

- HTML
- CSS
- JavaScript
  
## References

[Assignment Detail](docs/README.md)
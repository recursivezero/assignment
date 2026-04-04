# Internship Assignment: Family Tree Application Development

## Objective

As an intern, your task is to develop a Family Tree application that caters to the cultural nuances of family relationships in India. The application should allow users to create, share, and collaborate on their family trees. Additionally, users should have the option to include details such as date of birth, residence, occupation, and business location for each family member.

## Key Tasks

### Family Member Management

- Develop functionality for users to add themselves and their family members.
- Include fields for name, relationship, date of birth, residence, occupation, and business location.
- Consider there is only 1:1 mapping i.e. single husband and wife, no polygamy feature.

### Relationship Mapping

- Design a system for users to define relationships between family members.
- Ensure that the application recognizes and accommodates specific Indian familial relationships like Mausi, Mama, and bhua.
- if user click on a person then all relationship name would change keeping selected person in center.

### Data Sharing

- Implement a feature that allows users to share their family tree with specific relatives via email or username.

### Collaborative Editing

- Enable collaborative editing, allowing shared family members to contribute by adding their known relatives and detailing relationships.

### Privacy Settings

- Develop privacy settings to give users control over who can view and edit their family tree.

### Additional Details

- Provide an option for users to add more details about each family member, enhancing the depth and richness of the family tree.

## Submission Guidelines

- Share the GitHub repository link for evaluation.
- Include a README file with instructions on how to run the application locally.
- Ensure clear comments and documentation in your code.

## Evaluation Criteria

- Prevention and handling of error and invalid entries.
- Code structure, readability, and adherence to coding standards.
- Regular commits to the GitHub repository.

## Notes

- The internship assignment is expected to be completed within a week . Regular check-ins will be scheduled to monitor progress and provide guidance.
- Successful completion of the assignment may lead to further opportunities for involvement in the project or consideration for a more permanent position within the company.

### sample json

```json
{
  "familyTree": {
    "id": "001",
    "name": "Rajesh Sharma",
    "dob": "1970-05-15",
    "residence": "Delhi, India",
    "occupation": "Businessman",
    "businessLocation": "Chandni Chowk, Delhi",
    "relations": {
      "father": {
        "id": "010",
        "name": "Ramesh Sharma",
        "dob": "1945-12-01",
        "residence": "Delhi, India",
        "occupation": "Retired",
        "relationName": "Father",
        "nicknames": ["Papa", "Bauji", "Pitaji"]
      },
      "mother": {
        "id": "011",
        "name": "Kamla Sharma",
        "dob": "1948-05-22",
        "residence": "Delhi, India",
        "occupation": "Retired",
        "relationName": "Mother",
        "nicknames": ["Maa", "Amma", "Mummy"]
      },
      "wife": {
        "id": "002",
        "name": "Sunita Sharma",
        "dob": "1975-08-22",
        "residence": "Delhi, India",
        "occupation": "Homemaker",
        "relationName": "Wife",
        "nicknames": ["Patni", "Biwi", "Jeevansathi"]
      },
      "children": [
        {
          "id": "003",
          "name": "Amit Sharma",
          "dob": "1995-02-10",
          "residence": "Mumbai, India",
          "occupation": "Software Engineer",
          "relationName": "Son",
          "nicknames": ["Beta", "Putra"],
          "relations": {
            "wife": {
              "id": "005",
              "name": "Priya Sharma",
              "dob": "1997-06-15",
              "residence": "Mumbai, India",
              "occupation": "Doctor",
              "relationName": "Daughter-in-law",
              "nicknames": ["Bahu", "Vadhū"]
            },
            "children": [
              {
                "id": "006",
                "name": "Aryan Sharma",
                "dob": "2022-01-01",
                "residence": "Mumbai, India",
                "relationName": "Grandson",
                "nicknames": ["Pota", "Nati"]
              }
            ]
          }
        },
        {
          "id": "004",
          "name": "Anjali Sharma",
          "dob": "1998-11-25",
          "residence": "Bengaluru, India",
          "occupation": "Architect",
          "relationName": "Daughter",
          "nicknames": ["Beti", "Putri"]
        }
      ],
      "siblings": [
        {
          "id": "007",
          "name": "Pankaj Sharma",
          "dob": "1975-03-10",
          "residence": "Delhi, India",
          "occupation": "Teacher",
          "relationName": "Younger Brother",
          "nicknames": ["Bhai", "Chhota Bhai"],
          "relations": {
            "wife": {
              "id": "008",
              "name": "Kavita Sharma",
              "dob": "1978-07-18",
              "residence": "Delhi, India",
              "occupation": "Lawyer",
              "relationName": "Sister-in-law",
              "nicknames": ["Bhabhi", "Vadhu"]
            },
            "children": [
              {
                "id": "009",
                "name": "Neha Sharma",
                "dob": "2001-09-15",
                "residence": "Delhi, India",
                "occupation": "Student",
                "relationName": "Niece",
                "nicknames": ["Bhatiji", "Bhanji"]
              }
            ]
          }
        }
      ],
      "uncle": {
        "id": "012",
        "name": "Surendra Sharma",
        "dob": "1950-01-20",
        "residence": "Lucknow, India",
        "occupation": "Businessman",
        "relationName": "Paternal Uncle",
        "nicknames": ["Tauji", "Chacha"]
      },
      "aunt": {
        "id": "013",
        "name": "Rekha Sharma",
        "dob": "1955-07-30",
        "residence": "Lucknow, India",
        "occupation": "Retired Teacher",
        "relationName": "Paternal Aunt",
        "nicknames": ["Bhua", "Fufi"]
      },
      "maternalUncle": {
        "id": "014",
        "name": "Vikram Verma",
        "dob": "1960-04-10",
        "residence": "Kolkata, India",
        "occupation": "Professor",
        "relationName": "Maternal Uncle",
        "nicknames": ["Mama"]
      },
      "maternalAunt": {
        "id": "015",
        "name": "Sangeeta Verma",
        "dob": "1965-09-15",
        "residence": "Kolkata, India",
        "occupation": "Homemaker",
        "relationName": "Maternal Aunt",
        "nicknames": ["Mausi"]
      }
    }
  }
}
```

&copy; 2025 [RecursiveZero](https://recursivezero.com) private limited | All rights reserved.

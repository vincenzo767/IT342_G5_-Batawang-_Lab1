# Documentation Folder

This folder contains all project documentation, diagrams, and specifications.

## Contents

1. **FRS.md** - Functional Requirements Specification
   - Project overview
   - System architecture
   - Database design (ERD)
   - UML diagrams
   - API specifications
   - Security implementation

## Required Documentation for Lab 1

- [x] Entity Relationship Diagram (ERD)
- [x] UML Diagrams (Class, Sequence, Use Case)
- [ ] Web UI Screenshots:
  - [ ] Register Page
  - [ ] Login Page
  - [ ] Dashboard/Profile Page
  - [ ] Logout Functionality

## How to Add Screenshots

Once you have the web application running:

1. Take screenshots of each page
2. Save them in this folder with descriptive names:
   - `register-page.png`
   - `login-page.png`
   - `dashboard-page.png`
   - `logout-demo.png`

3. Convert FRS.md to PDF and include the screenshots

## Converting to PDF

You can use various tools to convert the Markdown file to PDF:

### Option 1: VS Code Extension
- Install "Markdown PDF" extension
- Open FRS.md
- Right-click → "Markdown PDF: Export (pdf)"

### Option 2: Online Tools
- https://www.markdowntopdf.com/
- Upload FRS.md
- Download PDF

### Option 3: Pandoc
```bash
pandoc FRS.md -o FRS.pdf
```

## Notes

- Update screenshots when UI changes
- Keep FRS.md in sync with implementation
- Version control all documentation changes

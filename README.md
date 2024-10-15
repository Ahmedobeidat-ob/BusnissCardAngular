# Business Card Management Application

This is a frontend Angular application for managing business cards. The application allows users to add new business cards through a form, upload files for import, display previews before submission, and list and filter stored business cards.

## Features

### 1. Add New Business Card
- A form is provided for users to input their business card information.
- Supports drag-and-drop or file upload options for XML, CSV imports.
- Displays a preview of the business card before submitting the data.

### 2. List Business Cards
- A page lists all stored business cards with the ability to:
  - Delete a business card.
  - Export a business card in different formats.
  
### 3. Optional Filtering
- Filtering options are available to refine the displayed list of business cards based on various criteria (e.g., name, email, phone).

### 4. File Imports (XML/CSV)
- Users can import business card data through XML or CSV files.
- **File Handling in Backend**: The backend parses XML and CSV files using C#.
- **Preview Before Submitting**: Imported data is temporarily stored in the frontend and displayed for user review before the final submission.




# BusinessCardAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

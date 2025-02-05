import { Component } from '@angular/core';
import { BusinessCardService } from '../Service/business-card-service.service';
import { BusinessCardsDTo } from '../Models/BusinessCardsDTo';
import { FormsModule } from '@angular/forms'; // Keep only what you need
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-business-cards',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-business-cards.component.html',
  styleUrls: ['./create-business-cards.component.css']
})

export class CreateBusinessCardsComponent {
  newCard: BusinessCardsDTo = {
    name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    photo: '',
    createdAt: new Date().toISOString(), // Set this to the current date

  };


  previewImage: string | ArrayBuffer | null = null;
  fileData: any[] = []; // Store the imported data for preview as table
  importedData: BusinessCardsDTo[] = []; // Store the preview of imported business cards

  constructor(private businessCardService: BusinessCardService,private router: Router) {}
  navigateToList() {
    console.log("Navigating to list page");
    this.router.navigate(['/business-card-list']);
  }

  onSubmit() {
    const cardToSubmit = { ...this.newCard };

    // If you want to include imported data, you can merge it here
    if (this.importedData.length > 0) {
      // Loop through importedData and submit each imported card
      this.importedData.forEach(importedCard => {
        const card = { ...cardToSubmit, ...importedCard };
        this.businessCardService.addBusinessCard(card).subscribe(
          (response) => {
            console.log('Imported business card added successfully:', response);
            // Optionally reset form after importing all cards
            this.resetForm();
          },
          (error) => {
            console.error('Error adding imported business card:', error);
          }
        );
      });
    } else {
      // Proceed with adding the regular newCard
      this.businessCardService.addBusinessCard(this.newCard).subscribe(
        (response) => {
          console.log('Business card added successfully:', response);
          this.resetForm(); // Reset form after successful submission
          this.clearImportPreview(); // Clear the import preview and file uploader
        },
        (error) => {
          console.error('Error adding business card:', error);
        }
      );
    }
  }

  clearImportPreview() {
    this.importedData = []; // Clear the previewed imported data
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the file input field
    }
  }



  resetForm() {
    this.newCard = {
      name: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      photo: '',
      createdAt: new Date().toISOString(), // Reset createdAt to the current date
    };
    this.fileData = []; // Reset file data
    this.clearImportPreview(); // Clear the import preview and file uploader
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64WithPrefix = reader.result as string;
        const base64Data = base64WithPrefix.replace(/^data:image\/\w+;base64,/, '');
        this.newCard.photo = base64Data; // Assign the raw Base64 string
      };
      reader.readAsDataURL(file); // Convert the file to Base64
    } else {
      this.newCard.photo = ''; // Clear photo if no file is selected
    }
  }


  onImportFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result as string;
        if (fileType === 'xml') {
          this.importedData = this.parseXml(fileContent); // Parse XML data and assign to importedData
        } else if (fileType === 'csv') {
          this.importedData = this.parseCsv(fileContent); // Parse CSV data and assign to importedData
        } else {
          console.error('Unsupported file format');
        }
      };

      if (fileType === 'xml' || fileType === 'csv') {
        reader.readAsText(file); // Read the file as text for XML/CSV preview
      }
    }
  }

  // Example of the parseXml function
  parseXml(xmlString: string): any[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const cards: any[] = [];

    const businessCards = xmlDoc.getElementsByTagName('BusinessCardsDTo');
    for (let i = 0; i < businessCards.length; i++) {
      const card = businessCards[i];
      cards.push({
        name: card.getElementsByTagName('Name')[0].textContent,
        gender: card.getElementsByTagName('Gender')[0].textContent,
        dateOfBirth: card.getElementsByTagName('DateOfBirth')[0].textContent,
        email: card.getElementsByTagName('Email')[0].textContent,
        phone: card.getElementsByTagName('Phone')[0].textContent,
        address: card.getElementsByTagName('Address')[0].textContent,
        createdat: card.getElementsByTagName('CreatedAt')[0].textContent,
      });
    }
    console.log('Parsed XML data:', cards); // Log parsed data
    return cards;
  }


  parseCsv(csv: string): BusinessCardsDTo[] {
    const rows = csv.split('\n').filter(row => row.trim() !== ''); // Filter out empty rows
    console.log('CSV rows:', rows); // Log rows for debugging

    if (rows.length === 0) {
        console.error('CSV is empty');
        return [];
    }

    const headers = rows[0].split(',').map(header => header.trim());
    console.log('CSV headers:', headers); // Log headers for debugging

    return rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        const obj: Record<string, any> = {}; // Use Record<string, any> for dynamic keys

        headers.forEach((header, index) => {
            if (index < values.length) {
                obj[header] = values[index] === '' ? null : values[index]; // Treat empty strings as null
            } else {
                console.warn(`Missing value for header '${header}' in row: ${row}`);
                obj[header] = null; // Set to null if value is missing
            }
        });

        console.log('Parsed CSV row:', obj); // Log each parsed row
        return obj as BusinessCardsDTo; // Cast to BusinessCardsDTo type
    });
}



  clearFileInput(fileInput: any) {
    fileInput.value = ''; // Clear the file input value
  }
  importXml(file: File) {
    this.businessCardService.importXml(file).subscribe(
      (response) => {
        console.log('Imported XML data:', response);
        this.importedData = response; // Assuming the response contains an array of BusinessCardsDTo
      },
      (error) => {
        console.error('Error importing XML:', error);
      }
    );
  }

  importCsv(file: File) {
    this.businessCardService.importCsv(file).subscribe(
      (response) => {
        console.log('Imported CSV data:', response);
        this.importedData = response; // Assuming the response contains an array of BusinessCardsDTo
      },
      (error) => {
        console.error('Error importing CSV:', error);
      }
    );
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default to allow drop
}


onFileDrop(event: DragEvent) {
  event.preventDefault(); // Prevent default behavior
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
      this.onImportFileChange({ target: { files } }); // Handle the dropped file
  }
}



  onFileUpload(event: any) {
    const file = event.target.files[0];
    // Add your file processing logic here
  }
}

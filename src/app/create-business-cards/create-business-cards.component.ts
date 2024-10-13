import { Component } from '@angular/core';
import { BusinessCardService } from '../Service/business-card-service.service';
import { BusinessCardsDTo } from '../Models/BusinessCardsDTo';
import { FormsModule } from '@angular/forms'; // Keep only what you need
import { CommonModule } from '@angular/common';

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

  constructor(private businessCardService: BusinessCardService) {}

  onSubmit() {
    this.businessCardService.addBusinessCard(this.newCard).subscribe(
      (response) => {
        console.log('Business card added successfully:', response);
        this.resetForm(); // Reset form after successful submission
      },
      (error) => {
        console.error('Error adding business card:', error);
      }
    );
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
      createdAt: new Date().toISOString(), // Set this to the current date


    };
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

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevent default to allow drop
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault(); // Prevent default behavior
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onFileChange({ target: { files } }); // Handle the dropped file
    }
  }


  onFileUpload(event: any) {
    const file = event.target.files[0];
    // Add your file processing logic here
  }
}

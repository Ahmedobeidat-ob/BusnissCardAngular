import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // This is correct
import { BusinessCardService } from '../Service/business-card-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { routes } from '../app.routes';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-business-card-list',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule], // Ensure CommonModule is included here
  templateUrl: './business-card-list.component.html',
  styleUrls: ['./business-card-list.component.css']
})
export class BusinessCardListComponent implements OnInit {
  businessCards: any[] = [];
  originalBusinessCards: any[] = [];
  filters = {
    name: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    phone: ''
  };
  constructor(
    private businessCardService: BusinessCardService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  navigateToCreate() {
    console.log("Navigating to create page");
    this.router.navigate(['/create-business-card']);
  }

  ngOnInit() {
    this.loadBusinessCards(); // Load all business cards initially
  }

  loadBusinessCards() {
    this.businessCardService.getBusinessCards().subscribe(
      (data) => {
        this.businessCards = data; // Store all business cards
        this.originalBusinessCards = [...data]; // Keep a copy of the original data for filtering
      },
      (error) => {
        console.error('Error fetching business cards', error);
      }
    );
  }


  applyFilter() {
    const filteredData = this.originalBusinessCards.filter(card => {
        const nameMatch = !this.filters.name ||
            card.name.toLowerCase().includes(this.filters.name.toLowerCase());

        const genderMatch = !this.filters.gender ||
            card.gender.toLowerCase()===this.filters.gender.toLowerCase();

        // Check date of birth only if a date is provided
        const dobMatch = !this.filters.dateOfBirth ||
            this.formatDate(card.dateOfBirth) === this.filters.dateOfBirth;

        const emailMatch = !this.filters.email ||
            card.email.toLowerCase().includes(this.filters.email.toLowerCase());

        const phoneMatch = !this.filters.phone ||
            card.phone.includes(this.filters.phone); // Assuming phone numbers are not case-sensitive

        return nameMatch && genderMatch && dobMatch && emailMatch && phoneMatch;
    });

    // Update the filtered data in your component's state
    this.businessCards = filteredData;
}

// Helper method to format the date to YYYY-MM-DD
private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Returns date in YYYY-MM-DD format
}



  clearFilters() {
    this.filters = {
      name: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      phone: ''
    };
    // Restore the original data
    this.businessCards = [...this.originalBusinessCards];
  }


  deleteCard(card: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this business card?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call the delete API
        this.businessCardService.deleteCard(card.id).subscribe(
          () => {
            // Remove the card from the local array
            this.businessCards = this.businessCards.filter(c => c.id !== card.id);
          },
          (error) => {
            console.error('Error deleting card', error);
          }
        );
      }
    });
  }

  exportToCsv() {
    this.businessCardService.exportToCsv().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BusinessCards.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error exporting CSV', error);
    });
  }

  exportToXml() {
    this.businessCardService.exportToXml().subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'BusinessCards.xml';
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error exporting XML', error);
    });
  }
}

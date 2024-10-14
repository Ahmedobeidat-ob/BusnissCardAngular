import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessCardListComponent } from "./business-card-list/business-card-list.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BusinessCardListComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `<router-outlet></router-outlet>`

})
export class AppComponent {
  title = 'BusinessCard-Angular';
}

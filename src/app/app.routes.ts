import { Routes } from '@angular/router';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { CreateBusinessCardsComponent } from './create-business-cards/create-business-cards.component';

export const routes: Routes = [
  { path: 'business-card-list', component: BusinessCardListComponent }, // Route for business card list
  { path: 'create-business-card', component: CreateBusinessCardsComponent }, // Route for creating a new business card
  { path: '', redirectTo: '/business-card-list', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/business-card-list' } // Wildcard route for undefined paths
];

import { Routes } from '@angular/router';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { CreateBusinessCardsComponent } from './create-business-cards/create-business-cards.component';

export const routes: Routes = [
  { path: 'business-card-list', component: BusinessCardListComponent },
  { path: 'create-business-card', component: CreateBusinessCardsComponent },
  { path: '', redirectTo: '/business-card-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/business-card-list' }
];

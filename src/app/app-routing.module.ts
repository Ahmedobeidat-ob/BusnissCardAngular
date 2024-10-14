import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { CreateBusinessCardsComponent } from './create-business-cards/create-business-cards.component';

const routes: Routes = [

  { path: 'create-business-card', component: CreateBusinessCardsComponent },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

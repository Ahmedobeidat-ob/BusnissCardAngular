import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Make sure FormsModule is imported
import { HttpClientModule } from '@angular/common/http'; // If you're making HTTP requests
import { AppRoutingModule } from './app-routing.module'; // Import the routing module
import { CreateBusinessCardsComponent } from './create-business-cards/create-business-cards.component';
import { BusinessCardListComponent } from './business-card-list/business-card-list.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [

    // Declare other components if needed
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, // Add the routing module here
    AppComponent // Import AppComponent here
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}

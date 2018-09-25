import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAezERfylXQGWKbOyR9XV5aJb_FTZQkApI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    SearchPlayerComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAezERfylXQGWKbOyR9XV5aJb_FTZQkApI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

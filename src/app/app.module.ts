import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { SearchTeamComponent } from './search-team/search-team.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamHistoryMatchComponent } from './team-history-match/team-history-match.component';
import { HistoryMatchComponent } from './team-history-match/history-match.component';
import { TeamFormationComponent } from './team-detail/team-formation/team-formation.component';
import { AuthenGuard } from './core/guards/authen.guard';
import { HttpClientModule }    from '@angular/common/http';
import { LoggedGuard } from './core/guards/logged.guard';
import { AccountService } from './core/services/account.service';
import { PlayerEditComponent } from './player-detail/player-edit/player-edit.component';
import { PlayerViewComponent } from './player-detail/player-view/player-view.component';
const appRoute:Routes = [
  {
    path:'login',
    component: LoginComponent,
    canActivate: [LoggedGuard]
  },
  {
    path:'',
    redirectTo : '/dashboard',
    pathMatch:'full',
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthenGuard]
  },
  {
    path:'search-player',
    component:SearchPlayerComponent,
    canActivate: [AuthenGuard]
  },
  {
    path:'search-team',
    component:SearchTeamComponent,
    canActivate: [AuthenGuard]
  },
  {
    path:'player-details',
    component:PlayerDetailComponent,
    canActivate: [AuthenGuard],
    children: [
      {
        path:'',
        component: PlayerViewComponent,
        pathMatch: 'full',
        canActivate: [AuthenGuard]
      },{
        path:'view',
        component: PlayerViewComponent,
        pathMatch: 'full',
        canActivate: [AuthenGuard]
      }
      ,{
        path:'edit',
        component: PlayerEditComponent,
        canActivate: [AuthenGuard]
      }
    ]
  },
  {
    path:'player-details/:id',
    component:PlayerDetailComponent,
    canActivate: [AuthenGuard],
    children: [
      {
        path:'',
        component: PlayerViewComponent,
        pathMatch: 'full',
        canActivate: [AuthenGuard]
      }
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    SearchPlayerComponent,
    FilterPipe,
    PlayerDetailComponent,
    SearchTeamComponent,
    TeamDetailComponent,
    TeamHistoryMatchComponent,
    HistoryMatchComponent,
    TeamFormationComponent,
    PlayerEditComponent,
    PlayerViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAezERfylXQGWKbOyR9XV5aJb_FTZQkApI'
    }),
    RouterModule.forRoot(appRoute)
  ],
  providers: [AuthenGuard,LoggedGuard,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

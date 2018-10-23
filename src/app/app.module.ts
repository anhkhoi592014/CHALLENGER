import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './menu/menu.component';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
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
import { PlayerViewComponent } from './player-detail/player-view/player-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { ChangePasswordComponent } from './player-detail/change-password/change-password.component';
import { PlayerEditInfoComponent } from './player-detail/player-edit/player-edit-info/player-edit-info.component';
import { PlayerEditPowerComponent } from './player-detail/player-edit/player-edit-power/player-edit-power.component';
import { PositionService } from './core/services/position.service';
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
        redirectTo: 'edit/info', 
        pathMatch: 'full',
        canActivate: [AuthenGuard],
      },
      { path: 'edit/info', component: PlayerEditInfoComponent,canActivate: [AuthenGuard] },
      { path: 'edit/power', component: PlayerEditPowerComponent,canActivate: [AuthenGuard] } 
    
      ,{
        path:'change-password',
        component: ChangePasswordComponent,
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
    PlayerViewComponent,
    LoadingSpinnerComponent,
    ChangePasswordComponent,
    PlayerEditInfoComponent,
    PlayerEditPowerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, ToastrModule.forRoot(),
    ReactiveFormsModule ,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAezERfylXQGWKbOyR9XV5aJb_FTZQkApI'
    }),
    RouterModule.forRoot(appRoute)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenGuard,LoggedGuard,AccountService,PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

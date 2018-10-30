import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgmCoreModule } from '@agm/core';
import { MenuComponent } from './shared/menu/menu.component';
import { SearchPlayerComponent,DialogFriendRequestMessages } from './search-player/search-player.component';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes} from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { SearchTeamComponent } from './search-team/search-team.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamHistoryMatchComponent } from './team-detail/team-history-match/team-history-match.component';
import { HistoryMatchComponent } from './team-detail/team-history-match/history-match.component';
import { TeamFormationComponent } from './team-detail/team-formation/team-formation.component';
import { AuthenGuard } from './core/guards/authen.guard';
import { HttpClientModule }    from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { LoggedGuard } from './core/guards/logged.guard';
import { AccountService } from './core/services/account.service';
import { PlayerViewComponent } from './player-detail/player-view/player-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './shared/ui/loading-spinner/loading-spinner.component';
import { ChangePasswordComponent } from './player-detail/change-password/change-password.component';
import { PlayerEditInfoComponent } from './player-detail/player-edit/player-edit-info/player-edit-info.component';
import { PlayerEditPowerComponent } from './player-detail/player-edit/player-edit-power/player-edit-power.component';
import { PositionService } from './core/services/position.service';
import { TeamViewComponent } from './team-detail/team-view/team-view.component';
import { TeamManageComponent } from './team-detail/team-manage/team-manage.component';
import { TeamsComponent } from './teams/teams.component';
import { ErrorsHandler } from './shared/errors-handler';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material';

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
    path:'teams',
    redirectTo: 'teams/select',
    pathMatch: 'full',
    canActivate: [AuthenGuard]
  },
  {
    path:'teams/select',
    component:TeamsComponent,
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
  },
  {
    path:'team-details',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthenGuard],
    
  },
  {
    path:'team-details/:id',
    component:TeamDetailComponent,
    canActivate: [AuthenGuard],
    children: [
      {
        path:'',
        component: TeamViewComponent,
        pathMatch: 'full',
        canActivate: [AuthenGuard]  
      },
      {
        path:'history-match',
        component: TeamHistoryMatchComponent,
        canActivate: [AuthenGuard]
      },
      {
        path:'formation',
        component: TeamFormationComponent,
        canActivate: [AuthenGuard]
      },
      {
        path:'manage',
        component: TeamManageComponent,
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
    HeaderComponent,
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
    PlayerEditPowerComponent,
    TeamViewComponent,
    TeamManageComponent,
    TeamsComponent,
    DialogFriendRequestMessages
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, ToastrModule.forRoot(),
    ReactiveFormsModule ,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatNativeDateModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAezERfylXQGWKbOyR9XV5aJb_FTZQkApI'
    }),
    RouterModule.forRoot(appRoute)
  ],

  entryComponents: [SearchPlayerComponent, DialogFriendRequestMessages],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenGuard,LoggedGuard,AccountService,PositionService,{
    provide: ErrorHandler,
    useClass: ErrorsHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }

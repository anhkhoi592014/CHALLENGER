import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { AccountService } from '../core/services/account.service';
import { ITeam } from '../interfaces/ITeam';
import { SystemConstants } from '../core/common/system.constants';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  listTeams : ITeam[] = [];
  selectedMenu : number = 3;
  constructor(
    private accountServices: AccountService,
    private router: Router  
    ) { }

  ngOnInit() {
    this.accountServices.Teams.subscribe(res => {
      this.listTeams = <ITeam[]>res;
    });
    this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  test(){
    console.log(this.listTeams.length);  
  }

  viewTeam(team: ITeam){
    localStorage.removeItem(SystemConstants.CURRENT_TEAM);
    localStorage.setItem(SystemConstants.CURRENT_TEAM,team.id.toString());
    this.router.navigate([UrlConstants.TEAM_DETAILS + '/' + team.id]);
  }

}

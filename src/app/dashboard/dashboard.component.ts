import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { ITeam } from '../interfaces/ITeam';
import { AccountService } from '../core/services/account.service';
import { SystemConstants } from '../core/common/system.constants';
import { UrlConstants } from '../core/common/url.constants';
import { Router } from '@angular/router';
import { TeamService } from '../core/services/team.service';

interface marker {
	lat: number;
	lng: number;
  iconUrl?: String;
  name: String;
  teamId: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'chonbd', title : 'Đội bóng',imgUrl : '../../assets/doibong.png'},
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 1;
  listTopTeams : ITeam[] = [
    { id:1, Fullname : 'Manchester UNITED',ImgUrl : '../../assets/logo01.png',Status : true},
    { id:2, Fullname : 'TruongChinh UNITED',ImgUrl : '../../assets/logo02.png',Status : true},
    { id:3, Fullname : 'Hutech UNITED',ImgUrl : '../../assets/logo03.jpg',Status : false},
    { id:4, Fullname : 'Dubai UNITED',ImgUrl : '../../assets/logo04.png',Status : true},
    { id:5, Fullname : 'asdasdasd UNITED',ImgUrl : '../../assets/logo05.png',Status : false},
    { id:6, Fullname : 'Manchester City',ImgUrl : '../../assets/logo06.png',Status : true},
    { id:7, Fullname : 'Manchester UNITED',ImgUrl : '../../assets/logo07.png',Status : true},
  ];
  iconUrl : string = 'http://maps.google.com/mapfiles/kml/pal2/icon49.png';
  loadingMapSpinner: boolean = true;
  markers : marker[] = [];
  longitude = 106.658342;
  latitude = 10.860960;
  zoom = 13;
  listTeamsResult: ITeam[] = [];
  constructor(
    private accountServices: AccountService,
    private router: Router,
    private teamServices: TeamService
  ) { }
  ngOnInit() {
    this.accountServices.getTeamsFromServer();
    this.accountServices.listTeams.subscribe(res => {
      if(res.length != 0){
        this.listTeamsResult = res;
        console.log(this.listTeamsResult);
        this.listTeamsResult.forEach(t => {
          this.markers.push({
            lat: t.latitude,
            lng: t.longitude,
            iconUrl: t.ImgUrl,
            name: t.Fullname,
            teamId: t.id
          });
        });
        this.loadingMapSpinner = false;
      }
    });
    this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getUsersFromServer();
    this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getUserPositions(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getListFriend(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getListUserHadSendFR(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  locationChosen(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  viewTeam(id : number){
    this.loadingMapSpinner = true;
    localStorage.removeItem(SystemConstants.CURRENT_TEAM);
    localStorage.setItem(SystemConstants.CURRENT_TEAM,id.toString());
    this.teamServices.getTeamById(id);
    setTimeout(() => {
      this.router.navigate([UrlConstants.TEAM_DETAILS + "/" + id]);
    }, 3500);
  }
}

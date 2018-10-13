import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { ITeam } from '../interfaces/ITeam';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  listMenu : IMenu[] = [
    {id:1,code:'tct', title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    {id:2,code:'tdb', title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  listTopTeams : ITeam[] = [
    { id:1, name : 'Manchester UNITED',imgUrl : '../../assets/logo01.png',status : true},
    { id:2, name : 'TruongChinh UNITED',imgUrl : '../../assets/logo02.png',status : true},
    { id:3, name : 'Hutech UNITED',imgUrl : '../../assets/logo03.jpg',status : false},
    { id:4, name : 'Dubai UNITED',imgUrl : '../../assets/logo04.png',status : true},
    { id:5, name : 'asdasdasd UNITED',imgUrl : '../../assets/logo05.png',status : false},
    { id:6, name : 'Manchester City',imgUrl : '../../assets/logo06.png',status : true},
    { id:7, name : 'Manchester UNITED',imgUrl : '../../assets/logo07.png',status : true},
  ];

  longitude = 106.699878;
  latitude = 10.821923;
  ngOnInit() {
  }
  locationChosen(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
 
}

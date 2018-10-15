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
    { id:1, Fullname : 'Manchester UNITED',ImgUrl : '../../assets/logo01.png',Status : true},
    { id:2, Fullname : 'TruongChinh UNITED',ImgUrl : '../../assets/logo02.png',Status : true},
    { id:3, Fullname : 'Hutech UNITED',ImgUrl : '../../assets/logo03.jpg',Status : false},
    { id:4, Fullname : 'Dubai UNITED',ImgUrl : '../../assets/logo04.png',Status : true},
    { id:5, Fullname : 'asdasdasd UNITED',ImgUrl : '../../assets/logo05.png',Status : false},
    { id:6, Fullname : 'Manchester City',ImgUrl : '../../assets/logo06.png',Status : true},
    { id:7, Fullname : 'Manchester UNITED',ImgUrl : '../../assets/logo07.png',Status : true},
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

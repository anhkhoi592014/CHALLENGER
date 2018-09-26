import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { Team } from '../team';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  listMenu : Menu[] = [
    { title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    { title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    { title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    { title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  listTopTeams : Team[] = [
    { name : 'Manchester UNITED',imgUrl : '../../assets/logo01.png',status : true},
    { name : 'TruongChinh UNITED',imgUrl : '../../assets/logo02.png',status : true},
    { name : 'Hutech UNITED',imgUrl : '../../assets/logo03.jpg',status : false},
    { name : 'Dubai UNITED',imgUrl : '../../assets/logo04.png',status : true},
    { name : 'asdasdasd UNITED',imgUrl : '../../assets/logo05.png',status : false},
    { name : 'Manchester City',imgUrl : '../../assets/logo06.png',status : true},
    { name : 'Manchester UNITED',imgUrl : '../../assets/logo07.png',status : true},
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

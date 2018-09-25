import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';

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
  longitude = 106.699878;
  latitude = 10.821923;
  ngOnInit() {
  }
  locationChosen(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }
 
}

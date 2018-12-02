import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png',subMenu:[
      { code:'chonbd' ,title: 'Chọn đội bóng',imgUrl : '../../assets/timcauthu.png' },
      { code:'taodb' ,title: 'Tạo đội bóng',imgUrl : '../../assets/timcauthu.png' }
    ]},
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 3;
  constructor() { }

  ngOnInit() {
  }

}

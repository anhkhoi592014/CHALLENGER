import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';

@Component({
  selector: 'app-team-manage',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {

  listMenu : IMenu[] = [
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 4;
  
  constructor() { }

  ngOnInit() {
  }

}

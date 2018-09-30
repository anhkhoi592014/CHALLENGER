import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  listMenu : IMenu[] = [
    { id:1, title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,title : 'Lịch sữ trận đấu',imgUrl : '../../assets/map.png' },
    { id:3,title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 1;
  constructor() { }

  ngOnInit() {
  }

}

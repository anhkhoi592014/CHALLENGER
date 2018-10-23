import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';

@Component({
  selector: 'app-player-edit-power',
  templateUrl: './player-edit-power.component.html',
  styleUrls: ['./player-edit-power.component.scss']
})
export class PlayerEditPowerComponent implements OnInit {
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png' },
    { id: 2,code:'editpf' ,title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code: 'editcscn' ,title: 'Chỉ số cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { id: 4,code:'dmk', title: 'Đổi mật khẩu',imgUrl : '../../assets/password.png'},
    { id: 5,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 3;
  constructor() { }

  ngOnInit() {
  }

}

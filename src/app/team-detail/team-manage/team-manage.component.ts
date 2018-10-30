import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { AccountService } from 'src/app/core/services/account.service';
import { Router } from '@angular/router';
import { IPlayer } from 'src/app/interfaces/IPlayer';

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
  listPlayerResult: IPlayer[] = [];
  constructor(
    private accountServices : AccountService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.accountServices.listUsers.subscribe(data => {
      if(data.length == 0){
        this.accountServices.getUsersFromServer();
      }else{
        this.listPlayerResult = data;
        // this.showSpinner = false;
      }
    });
  }

  test(){
    console.log(this.listPlayerResult);
  }
}

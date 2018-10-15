import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { IPlayer } from '../../interfaces/IPlayer';

@Component({
  selector: 'app-team-formation',
  templateUrl: './team-formation.component.html',
  styleUrls: ['./team-formation.component.scss']
})
export class TeamFormationComponent implements OnInit {

  playerChoiced :number = 1;
  
  constructor() { }

  ngOnInit() {
  }
  
  listPlayer: IPlayer[]= [
  ];

  
  listMenu : IMenu[] = [
    { id:1, title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];

  selectedMenu : number = 3;

  choicePlayer(id: number): void{
    this.playerChoiced = id;
  }
}

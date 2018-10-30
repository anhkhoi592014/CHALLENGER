import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { IPlayer } from '../../interfaces/IPlayer';
import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { TeamService } from 'src/app/core/services/team.service';
import { IMember } from 'src/app/interfaces/IMember';
import { IRole } from 'src/app/interfaces/irole';
import { PositionService } from 'src/app/core/services/position.service';
import { IPosition } from 'src/app/interfaces/iposition';

@Component({
  selector: 'app-team-formation',
  templateUrl: './team-formation.component.html',
  styleUrls: ['./team-formation.component.scss']
})
export class TeamFormationComponent implements OnInit {

  playerChoiced :IPlayer = {};
  playerChoicedAge : number = 0;
  playerChoicedPosition : IPosition = {}; 
  teamMembers: IMember[] = [];
  listPlayer: IPlayer[] = [];
  listPlayerRoles: IRole[] = [];

  constructor(
    private teamServices: TeamService,
    private positionServices: PositionService
  ) {}

  ngOnInit() { 
    this.teamServices.Users.subscribe(res => {
      if(res.length == 0){
        this.teamServices.getTeamMembers(localStorage.getItem(SystemConstants.CURRENT_TEAM));
      }else{
        this.listPlayer = <IPlayer[]>res;
        this.playerChoiced = this.listPlayer[0];
        this.playerChoicedAge = (new Date().getFullYear() - new Date(this.listPlayer[0].DateOfBirth).getFullYear());
      }
    });
    this.teamServices.Members.subscribe(res =>{
      if(res.length == 0){
        this.teamServices.getTeamMembersDetails(localStorage.getItem(SystemConstants.CURRENT_TEAM));  
      }else{
        this.teamMembers = <IMember[]>res;
        this.positionServices.Positions.subscribe(res =>{
          res.length == 0 ?
          this.positionServices.getPosition(this.teamMembers[0].position_id) :
          this.playerChoicedPosition = <IPosition>res;
        });
      } 
    });
      
  }
    
  listMenu : IMenu[] = [
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];

  selectedMenu : number = 3;

  choicePlayer(player: IPlayer): void{
    this.playerChoiced = player;
    this.playerChoicedAge = (new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear());
  }
}

import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { IPlayer } from '../../interfaces/IPlayer';
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
  listMenu : IMenu[] = [
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 3;
  playerChoiced :IPlayer = {};
  playerChoicedAge : number = 0;
  playerChoicedPosition : IPosition = {}; 
  teamMembers: IMember[] = [];
  listPlayer: IPlayer[] = [];
  listPlayerRoles: IRole[] = [];
  positionData: IPosition[] = [];
  showSpinner: boolean = true;
  constructor(
    private teamServices: TeamService,
    private positionServices: PositionService
  ) {}

  ngOnInit() { 
    // this.teamServices.Users.subscribe(res => {
    //   if(res.length == 0){
    //   }else{
    //     this.listPlayer = <IPlayer[]>res;
    //     this.playerChoiced = this.listPlayer[0];
    //     this.playerChoicedAge = (new Date().getFullYear() - new Date(this.listPlayer[0].DateOfBirth).getFullYear());
    //   }
    // });
    this.positionServices.listPositions.subscribe(res =>{
      if(res.length == 0){
        this.positionServices.getPositionsFromServer();
      }else{
        this.positionData = res;
      }
    });
    this.teamServices.Members.subscribe(res =>{
      if(res.length == 0){
        this.teamServices.getTeamMembersDetails(localStorage.getItem(SystemConstants.CURRENT_TEAM));  
      }else{
        this.teamMembers = <IMember[]>res;
        this.teamServices.getTeamMembers(localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
          this.teamMembers.forEach(m =>{
            res.forEach(u => {
              if(m.user_id == u.id){
                m.user = u;
              }
            });
          });
        this.teamMembers.forEach(m =>{
          this.positionData.forEach(p =>{
            if(m.position_id == p.id){
              m.position = p;
            }
          });
          if(m.role_id == 2){
            m.imgRoleUrl ="../../../assets/team-manager.png";
            m.roleName = "Quản lý đội";
          }else if(m.role_id == 3){
            m.imgRoleUrl ="../../../assets/team-admin.png";
            m.roleName = "Đội trưởng";
          }else{
            m.imgRoleUrl ="../../../assets/team-member.png"
            m.roleName = "Thành viên";
          }
        });
          this.playerChoiced = this.teamMembers[0].user;
          this.showSpinner = false;
          this.playerChoicedAge = (new Date().getFullYear() - new Date(this.teamMembers[0].user.DateOfBirth).getFullYear());
        });
      } 
    });
      
  }

  choicePlayer(player: IPlayer): void{
    this.playerChoiced = player;
    this.playerChoicedAge = (new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear());
  }
  show(){
    console.log(this.teamMembers);
  }
}

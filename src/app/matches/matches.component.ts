import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { TeamService } from '../core/services/team.service';
import { AccountService } from '../core/services/account.service';
import { UrlConstants } from '../core/common/url.constants';
import { SystemConstants } from '../core/common/system.constants';
import { IMatch } from '../interfaces/imatch';
import { ITeam } from '../interfaces/ITeam';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'chonbd', title : 'Đội bóng',imgUrl : '../../assets/doibong.png'},
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 2;
  listMatches : IMatch[] = [];
  listTeams: ITeam[] = [];
  teamData: ITeam[] = [];
  loaded: boolean = false;
  constructor(
    private teamService: TeamService,
    private userService: AccountService
  ) { }

  ngOnInit() {
    this.userService.listTeams.subscribe(res =>{
      if(res){
        console.log(res)
        this.teamData = res;
        this.userService.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER))
      }
    });
    this.userService.getTeamsFromServer();
    this.userService.Teams.subscribe(res =>{
      if(res.length > 0){
        if(!this.loaded){
          console.log(this.teamData)
          this.listTeams = res;
          this.listTeams.forEach(element => {
            this.teamService.getMatches(element.id).subscribe(match =>{
              if(match.length > 0){
                console.log(res);
                match.forEach(m => {
                  m.teamOne = this.teamData.filter(t => t.id == m.team_one_id)[0];
                  m.teamSecond = this.teamData.filter(t => t.id == m.team_second_id)[0];
                  this.listMatches.push(m);
                });
                this.loaded = true;
                console.log(this.listMatches)
              }
            });
          });
        }
      }
    })
  }

}

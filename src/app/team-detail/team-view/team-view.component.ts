import { Component, OnInit, ElementRef } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';

import * as Chart from 'chart.js'
import { AccountService } from 'src/app/core/services/account.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { TeamService } from 'src/app/core/services/team.service';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IMember } from 'src/app/interfaces/IMember';
@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {

  listMenu : IMenu[] =[
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  page_title: string ="Thông tin đội";
  selectedMenu : number = 1;
  listUserTeam : ITeam[] = [];
  team: ITeam = {};
  teamId: number = 0;
  PieChart:any;
  data:any;
  playerCity: String = "";
  teamMembers: IPlayer[] = [];
  totalMember: number = 0;
  teamMembersDetails: IMember[] = [];
  teamAdmin: IPlayer = {};
  showSpinner:boolean = true;
  myChart:any;
  constructor(
    private teamServices : TeamService,
    private accountServices : AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef
  ) { 
    this.route.params.subscribe(param => {
      this.teamId = param['id'];  
    })
  }
  ngOnInit() {
    if(!this.teamId){
      this.router.navigate([UrlConstants.TEAMS]);
    }
    if(localStorage.getItem(SystemConstants.MEMBER_ROLE)){
      if(localStorage.getItem(SystemConstants.MEMBER_ROLE) != "1"){
        this.listMenu = [
          { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
          { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
          { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
          { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
          { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
        ];
      }
    }else{
      this.teamServices.getRole(localStorage.getItem(SystemConstants.CURRENT_TEAM),localStorage.getItem(SystemConstants.CURRENT_USER)).subscribe(res =>{
        localStorage.removeItem(SystemConstants.MEMBER_ROLE);
        localStorage.setItem(SystemConstants.MEMBER_ROLE,res[0].role_id.toString());
        if(res[0].role_id != 1){
          this.listMenu = [
            { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
            { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
            { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
            { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
            { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
          ];
        }
      });
    }
    this.teamServices.Teams.subscribe(res => {
      if(res.length != 0){ 
        console.log(res);
        this.team = <ITeam>res;
        this.showSpinner = false;    
        this.chartit(this.team.WinRate); 
      }else{ 
        this.teamServices.getTeamById(this.teamId);
      }
    });
    this.accountServices.Teams.subscribe(res =>{
      if(res.length == 0){
        this.teamServices.getTeamMembers(this.teamId);
      }else{
        this.listUserTeam = <ITeam[]>res;
        if(!this.listUserTeam.filter(team => team.id == this.teamId)){
          this.listMenu = [{ id: 3,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }];
        }
      }
    });
    this.teamServices.Users.subscribe(res => {
      if(res.length == 0){
        this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
      }else{
        this.teamMembers = res;
        this.totalMember = this.teamMembers.length;
      }
    });
    this.teamServices.Members.subscribe(res => {
      if(res.length == 0){
        this.teamServices.getTeamMembersDetails(this.teamId);
      }else{
        this.teamMembersDetails = <IMember[]>res; 
        this.teamAdmin = this.teamMembers.filter(member => member.id == (this.teamMembersDetails.filter(member => member.role_id == 3)[0].user_id))[0];
      }
    });
  }
  
  chartit(winrate: number){
    let htmlRef = this.elementRef.nativeElement.querySelector(`#pieChart`);
    this.data = {
      labels: ["Win(%)", "Lose(%)"],
      datasets: [{
        fill: true, 
        backgroundColor: [
          '#81CE97',
          'brown'
        ],
        data: [winrate,100-winrate]
      }]
    };
    this.PieChart = new Chart(htmlRef,{
      type:'pie',
      data:this.data,
      options: {}
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-team-history-match',
  animations: [
    trigger('hideShow',[
      state('hide',style({ zIndex : '-1' })),
      state('show',style({ zIndex : '2' })),
      transition('hide => show',[
        animate('0.1s')
      ]),
      transition('show => hide',[
        animate('0.1s')
      ])
    ]),
    trigger('toggleDetail',[
      state('hide',style({height: '0px'})),
      state('show',style({minHeight : '350px'})),
      transition('hide=>show' ,[animate('300ms')]),
      transition('show=>hide' ,[animate('300ms')])
    ])
  ],
  templateUrl: './team-history-match.component.html',
  styleUrls: ['./team-history-match.component.scss'],
  
})
export class TeamHistoryMatchComponent implements OnInit {
  listMenu : IMenu[] = [
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 2;
  isOVShow:boolean = true;
  isNoteShow:boolean = false;
  DetailShow:number = 0;
  constructor(
    private teamServices: TeamService

  ) { }

  ngOnInit() {
    if(localStorage.getItem(SystemConstants.MEMBER_ROLE)){
      if(localStorage.getItem(SystemConstants.MEMBER_ROLE) != "3"){
        this.listMenu = [
          { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
          { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
          { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
          { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
        ];
      }
    }else{
      this.teamServices.getRole(localStorage.getItem(SystemConstants.CURRENT_TEAM),localStorage.getItem(SystemConstants.CURRENT_USER)).subscribe(res =>{
        localStorage.removeItem(SystemConstants.MEMBER_ROLE);
        localStorage.setItem(SystemConstants.MEMBER_ROLE,res[0].role_id.toString());
        if(res[0].role_id != 3){
          this.listMenu = [
            { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
            { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
            { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
            { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
          ];
        }
      });
    }
  }

  toggleNote(name:string){
    if(name == 'ov'){
      this.isOVShow = true;
      this.isNoteShow = false;
    }else{
      this.isNoteShow = true;
      this.isOVShow = false;
    }
  }
  toggleDetail(box:any){
    console.log(box);
    /*if(this.DetailShow == box){
      this.DetailShow = 0;
    }else{  
      this.DetailShow = box;
    }*/
  }
}

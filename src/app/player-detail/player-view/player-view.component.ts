import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';
import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { PositionService } from 'src/app/core/services/position.service';
import { IUserPosition } from 'src/app/interfaces/iuser-position';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { INotification } from 'src/app/interfaces/INotification';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  page_title : String = "Thông tin cầu thủ";
  player : IPlayer = {};
  powersData : IPower[] = [];
  listPowers : IPower[] = [];
  extraPowers : IPower[] = [];
  listTeams: ITeam[] = [];
  isMPView: boolean = true;
  userId: number = 0;
  spinnerLoading: boolean = true;
  playerAge: number = 0;
  userPositions: IUserPosition[] = [];
  mainPosition: IUserPosition = {};
  extraPosition: IUserPosition = {};
  showExtraPosition: boolean = false;
  showMainPosition: boolean = false;
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png' },
    { id: 2,code:'editpf' ,title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code: 'editcscn' ,title: 'Chỉ số cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { id: 4,code:'dmk', title: 'Đổi mật khẩu',imgUrl : '../../assets/password.png'},
    { id: 5,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 1;
  constructor(
    private accountServices : AccountService,
    private positionServices : PositionService,
    private notificationServices: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.params.subscribe(param => {
      if(param['id'] && (param['id'] != localStorage.getItem(SystemConstants.CURRENT_USER))){
        this.listMenu = [{ id: 3,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }];
      }  
      else{
        this.router.navigate([UrlConstants.PLAYER_DETAILS]);
      }
      this.userId = param['id'];  
    })
  }

  ngOnInit() {
    // Lấy dữ liệu 
    if(this.userId){
      this.accountServices.ViewUsers.subscribe(res =>{
        this.player = <IPlayer>res;
        this.playerAge = (new Date().getFullYear() - new Date(this.player.DateOfBirth).getFullYear());
        this.spinnerLoading = false; 
      });
      this.accountServices.getViewUserById(this.userId);
    }else{
      this.accountServices.Users.subscribe(res => {
        if(res.length != 0){
          this.player = <IPlayer>res;
          this.playerAge = (new Date().getFullYear() - new Date(this.player.DateOfBirth).getFullYear());
          this.spinnerLoading = false;  
        }
        else{       
          this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
        }
      });  
    }
    this.accountServices.Powers.subscribe(res => {
        if(res.length != 0){
        this.powersData = res;
        this.listPowers = res.filter(e => (e.TypeCode == "MP" && e.ViewStatus == 1));
        // Delay progress bar
        this.spinnerLoading = false;
        setTimeout(() => this.setProgressbar(), 200); 
      }else{
        (this.userId)?
        this.accountServices.getUserPowers(this.userId):
        this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));     
      }
    });  
    this.accountServices.Teams.subscribe(res => {
      if(res.length != 0){
        this.listTeams = <ITeam[]>res;
        this.spinnerLoading = false;
      }else{
        (this.userId)?
        this.accountServices.getUsersTeams(this.userId) :
        this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
    });
    this.accountServices.Positions.subscribe(res =>{   
      if(res.length != 0){  
        this.userPositions = <IUserPosition[]>res;
        if(this.mainPosition = this.userPositions.filter(p => p.TypeCode == 'MP')[0]){
          this.showMainPosition = true;
        }else{
          this.showMainPosition = false;
        }
        if(this.extraPosition = this.userPositions.filter(p => p.TypeCode == 'EP')[0]) {
          this.showExtraPosition = true;
        }else{
          this.showExtraPosition = false;
        }
      }else{
        (this.userId)? 
        this.accountServices.getUserPositions(this.userId) :
        this.accountServices.getUserPositions(localStorage.getItem(SystemConstants.CURRENT_USER));
        this.positionServices.getPositionsFromServer(); 
      }
    });
  } 
  log(){
  }
  changePositionView(po : String){
    po == "MP" ? this.isMPView = true : this.isMPView = false; 
    this.listPowers = this.powersData.filter(e => (e.TypeCode == po && e.ViewStatus == 1));
    setTimeout(() => this.setProgressbar(), 200);
  }
  setProgressbar() :void{
    var after = document.getElementsByClassName('after') as HTMLCollectionOf<HTMLElement>;
    for(var i = 0 ; i < after.length ; i++){
      var percent = parseInt((after[i].dataset.percent));
      after[i].style.transition = "1s cubic-bezier(.24,.72,.35,1.01),-webkit- 1s cubic-bezier(.24,.72,.35,1.01)";
      after[i].style.width = percent + "%"; 
    }
  }
  viewTeam(team: ITeam){
    console.log(team);
  }
}

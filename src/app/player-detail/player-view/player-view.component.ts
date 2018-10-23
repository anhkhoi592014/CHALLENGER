import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';
import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.scss']
})
export class PlayerViewComponent implements OnInit {
  player : IPlayer;
  powersData : IPower[] = [];
  listPowers : IPower[] = [];
  extraPowers : IPower[] = [];
  listTeams: ITeam[] = [];
  isMPView: boolean = true;
  userId: number = 0;
  spinnerLoading: boolean = true;
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
    private route: ActivatedRoute,
  ) { 
    this.route.params.subscribe(param => {
      (param['id'] && (param['id'] != localStorage.getItem(SystemConstants.CURRENT_USER)))? 
      this.listMenu = [{ id: 3,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }] : '';
      this.userId = param['id'];  
    })
  }

  ngOnInit() {
    // Lấy dữ liệu 
    this.accountServices.Users.subscribe(res => {
      this.player = <IPlayer>res;
      this.spinnerLoading = false;
    });
    this.accountServices.Powers.subscribe(res => {
      this.powersData = res;
      this.listPowers = res.filter(e => e.TypeCode == "MP");
      this.spinnerLoading = false;
    });
    this.accountServices.Teams.subscribe(res => {
      this.listTeams = <ITeam[]>res;
      this.spinnerLoading = false;
    })
    // Xem thong tin ca nhan nguoi la
    if(this.userId){
      this.accountServices.getUserById(this.userId);
      this.accountServices.getUserPowers(this.userId);
      this.accountServices.getUsersTeams(this.userId);
    }else{
      // Xem thong tin ca nhan user
      this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
      this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));
      this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
    }
    // Delay progress bar
    setTimeout(() => this.setProgressbar(), 1000);
  } 
  log(){
    console.log(this.listPowers); 
  }
  changePositionView(po : String){
    po == "MP" ? this.isMPView = true : this.isMPView = false; 
    this.listPowers = this.powersData.filter(e => e.TypeCode == po);
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
}

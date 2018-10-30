import { Component, OnInit } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { AccountService } from 'src/app/core/services/account.service';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IPower } from 'src/app/interfaces/ipower';
import { IUserPosition } from 'src/app/interfaces/iuser-position';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-player-edit-power',
  templateUrl: './player-edit-power.component.html',
  styleUrls: ['./player-edit-power.component.scss']
})
export class PlayerEditPowerComponent implements OnInit {
  pageTitle: String = "Chỉnh sữa chỉ số";
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png' },
    { id: 2,code:'editpf' ,title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code: 'editcscn' ,title: 'Chỉ số cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { id: 4,code:'dmk', title: 'Đổi mật khẩu',imgUrl : '../../assets/password.png'},
    { id: 5,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 3;
  player: IPlayer = {};
  spinnerLoading = true;
  powersData : IPower[] = [];
  listPowerView : IPower[] = [];
  listMainPowers : IPower[] = [];
  listExtraPowers : IPower[] = [];
  userPositions : IUserPosition[] = [];
  mainPosition: IUserPosition = {};
  extraPosition: IUserPosition = {};
  showExtraPosition: boolean = false;
  showMainPosition: boolean = false;
  isMPView : boolean = true;
  showSpinner : boolean = true;
  constructor(
    private accountServices : AccountService,
    private router : Router,
    private toast : ToastrManager
  ) { }

  ngOnInit() {
    this.accountServices.Users.subscribe(res => {
      if(res.length == 0){
        this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
      }else{
        this.player = <IPlayer>res;
        this.showSpinner = false;
      }
    });
    this.accountServices.Powers.subscribe(res => {
      if(res.length == 0){
        this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));
      }else{
        this.powersData = <IPower[]>res;
        this.listMainPowers = <IPower[]>this.powersData.filter(e => e.TypeCode == "MP");
        this.listExtraPowers = <IPower[]>this.powersData.filter(e => e.TypeCode == "EP");
        this.listPowerView = this.listMainPowers;
        this.showSpinner = false;
      }
    });
    this.accountServices.Positions.subscribe(res =>{
      if(res.length == 0){
        this.accountServices.getUserPositions(localStorage.getItem(SystemConstants.CURRENT_USER));
      }else{
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
        this.showSpinner = false;
      }
    });
    //
    //
    //
  }

  changePositionView(po : String){
    po == "MP" ? this.isMPView = true : this.isMPView = false; 
  }

  abort(){
    this.router.navigate([UrlConstants.PLAYER_DETAILS]);
  }

  save(){
    this.showSpinner = true;
    this.accountServices.updateUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER),
    this.listMainPowers.concat(this.listExtraPowers)).subscribe(res => {
      if(res){
        this.toast.successToastr('Sữa thông tin thành công.', 'Thông báo !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.showSpinner = false;
        this.router.navigate([UrlConstants.PLAYER_DETAILS]);
      }
    });
  }

  changeStatusPower(p: IPower){
    this.powersData.map(power => {
      if(p.id == power.id){
        (power.ViewStatus > 0) ? power.ViewStatus = 0 : power.ViewStatus = 1;
      }
    });
  }
}

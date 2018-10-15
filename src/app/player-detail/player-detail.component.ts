import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';
import { AccountService } from '../core/services/account.service';
import { SystemConstants } from '../core/common/system.constants';
import { IPower } from '../interfaces/ipower';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  
  listMenu : IMenu[] = [
    { id: 1,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' },
  ];
  selectedMenu :number = 1;
  //@Input() player : IPlayer;
  player : IPlayer;
  powersData : IPower[] = [];
  listPowers : IPower[] = [];
  extraPowers : IPower[] = [];
  isMPView: boolean = true;
  constructor(
    private accountServices : AccountService
  ) { }

  ngOnInit() {
    // Lấy dữ liệu 
    this.accountServices.Users.subscribe(res => {
      this.player = <IPlayer>res;
    });
    this.accountServices.Powers.subscribe(res => {
      this.powersData = res;
      this.listPowers = res.filter(e => e.TypeCode == "MP");
    });
    // Xem thong tin ca nhan nguoi la
    if(!localStorage.getItem("SELF_DETAIL")){
      this.accountServices.getUserById(localStorage.getItem(SystemConstants.ViewDetailUserId));
      this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.ViewDetailUserId));
      localStorage.removeItem("SELF_DETAIL");
    }else{
      // Xem thong tin ca nhan user
      this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
      this.accountServices.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));
    }
      // Delay progress bar
    setTimeout(() => this.setProgressbar(), 1000);
  } 
  log(){
    console.log(this.player); 
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

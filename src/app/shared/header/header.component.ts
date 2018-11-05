import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { INotification } from 'src/app/interfaces/INotification';
import { AccountService } from 'src/app/core/services/account.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import * as Echo from 'laravel-echo' ;
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/core/common/url.constants';
import * as moment from 'moment';
export interface showNotification{
  idNoti: number,
  idFrom?: number,
  imgUrl : string,
  typeName?: string,
  timeSend?: string,
  timeFromNow? : string
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showNotification: boolean = false;
  listUserSendNotification: IPlayer[] = [];
  notifications: INotification[] = [];
  listShowNotification: showNotification[] = [];
  updateStatus : boolean = false;
  showSpinnerViewUser: boolean = false;
  toggleFL: boolean = false;
  @Input() title: String;
  constructor(
    private accountServices: AccountService,
    private notificationServices: NotificationService,
    private router: Router
  ) { 
    this.subscribe();
  }

  ngOnInit() {
    this.accountServices.Notifications.subscribe(res =>{
        this.notifications = <INotification[]> res;
        this.notificationServices.Users.subscribe(res =>{
          this.listUserSendNotification = <IPlayer[]>res;
          this.listShowNotification = [];
          this.notifications.forEach(notification =>{
            this.listShowNotification.push({
              idNoti : notification.id,
              idFrom: notification.from_id,
              imgUrl: this.listUserSendNotification.filter(player => player.id == notification.from_id)[0].ImgUrl,
              typeName: this.getNotifitionName(notification.notification_type_id),
              timeFromNow: moment(notification.created_at).fromNow(),
              timeSend: notification.created_at
            });  
          })
        });
        this.notificationServices.getListUserSend(localStorage.getItem(SystemConstants.CURRENT_USER));
    }); 
    this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  delete(id: number){
    this.accountServices.deleteNotification(id).subscribe(res => {
      if(res){
        this.listShowNotification = this.listShowNotification.filter(noti => noti.idNoti != id);
      }
    });
   // this.updateStatus = true;
    //this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  accept(noti: showNotification){
    this.accountServices.addFriend(localStorage.getItem(SystemConstants.CURRENT_USER),noti.idFrom,noti.idNoti);
  }
  viewUser(id: any){
    this.showSpinnerViewUser = true;
    setTimeout(()=>{
      this.accountServices.getUserById(id);
      this.accountServices.getUserPowers(id);
      this.accountServices.getUsersTeams(id); 
      this.accountServices.getUserPositions(id);
      this.router.navigate([UrlConstants.PLAYER_DETAILS + '/' + id])
    },2000);
  }
  getNotifitionName(id: any): string{
    if(id == 1){
      return "Đã gửi lời mời kết bạn";
    }else if(id == 2){
      return "Đã gửi lời mời vào đội";
    }
  }
  subscribe(){
    var echo = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: '2a8e4ee7091be69eff31',
      cluster: 'ap1',
      encrypted: true
    });
    echo.channel('user.'+localStorage.getItem(SystemConstants.CURRENT_USER))
      .listen('NewRequest', (e:INotification[])=>{
         //this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
        this.notifications = e
      });
  }
  toggleNtf(){
    this.showNotification = !this.showNotification;
    this.listShowNotification.map((noti) =>{
      noti.timeFromNow = moment(noti.timeSend).fromNow()
    })
  }
  toggleFriendList(){
    this.toggleFL = !this.toggleFL;
  }
}

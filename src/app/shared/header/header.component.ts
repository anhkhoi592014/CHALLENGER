import { Component, OnInit, Input } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { INotification } from 'src/app/interfaces/INotification';
import { AccountService } from 'src/app/core/services/account.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import * as Echo from 'laravel-echo' ;
export interface showNotification{
  imgUrl : String,
  typeName?: String,
  timeSend?: Date
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
  @Input() title: String;
  constructor(
    private accountServices: AccountService,
    private notificationServices: NotificationService
  ) { }

  ngOnInit() {
    this.accountServices.Notifications.subscribe(res =>{
      if(res.length != 0){
        this.notifications = <INotification[]> res;
        this.subscribe();
        this.notificationServices.Users.subscribe(res =>{
          if(res.length != 0){
            this.listUserSendNotification = <IPlayer[]>res;
            this.notifications.forEach(notification =>{
              this.listShowNotification.push({
                imgUrl: this.listUserSendNotification.filter(player => player.id == notification.from_id)[0].ImgUrl,
                typeName: this.getNotifitionName(notification.notification_type_id)
              });  
            })
          }else{
            this.notificationServices.getListUserSend(localStorage.getItem(SystemConstants.CURRENT_USER));
          }
        });
      }else{
        this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
    }); 
  }
  getNotifitionName(id: any): String{
    if(id == 1){
      return "Đã gửi lời mời kết bạn";
    }else if(id == 2){
      return "Đã gửi lời mời vào đội";
    }
  }
  subscribe(){
    var echo = new Echo({
      broadcaster: 'pusher',
      key: '2a8e4ee7091be69eff31',
      cluster: 'ap1'
    });
    echo.channel('user.'+localStorage.getItem(SystemConstants.CURRENT_USER))
      .listen('NewRequest', (e:INotification)=>{
         this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
      });
  }
  toggleNtf(){
    this.showNotification = !this.showNotification;
    console.log(this.notifications);
  }
}

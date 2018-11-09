import { Component, OnInit, Input, Inject } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { INotification } from 'src/app/interfaces/INotification';
import { AccountService } from 'src/app/core/services/account.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SystemConstants } from 'src/app/core/common/system.constants';
import * as Echo from 'laravel-echo' ;
import { Router } from '@angular/router';
import { UrlConstants } from 'src/app/core/common/url.constants';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ConversationService } from 'src/app/core/services/conversation.service';
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
  listFriends : IPlayer[] = [];
  currentUser: IPlayer = {};
  filterPlayer: string = "";
  searchFilter : Boolean = false;
  imgChat: string = "../../../assets/chat.png";
  imgX: string = "../../../assets/x-mark.png";
  @Input() title: String;
  constructor(
    private accountServices: AccountService,
    private notificationServices: NotificationService,
    private conversationServices: ConversationService,
    private router: Router,
    private toastr: ToastrManager,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit() {
    this.subscribe(); 
    this.accountServices.Users.subscribe(res => {
        this.currentUser = <IPlayer>res;
    }); 
    this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
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
    this.accountServices.Friends.subscribe(data => {
      if(data.length == 0){
        this.accountServices.getListFriend(localStorage.getItem(SystemConstants.CURRENT_USER));
      }else{
        this.listFriends = data;   
      }
      console.log(data);
    });
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
    this.listFriends.push(this.listUserSendNotification.filter(p => p.id == noti.idFrom)[0]);
  }
  viewUser(id: any){
    this.showSpinnerViewUser = true;
    this.accountServices.getViewUserById(id);
    this.accountServices.getUserPowers(id);
    this.accountServices.getUsersTeams(id); 
    this.accountServices.getUserPositions(id);
    setTimeout(()=>{
      this.showSpinnerViewUser = false;
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
  resetFilter(){
    
  }
  subscribe(){
    var echo = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: '2a8e4ee7091be69eff31',
      cluster: 'ap1',
      encrypted: true
    });
    echo.channel('user.'+localStorage.getItem(SystemConstants.CURRENT_USER) + '.notifications')
      .listen('NewRequest', (e:INotification[])=>{
        console.log("channel new request");
        this.accountServices.getUserNotifications(localStorage.getItem(SystemConstants.CURRENT_USER));
        //this.notifications = e
      });
    var echo2 = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: '2a8e4ee7091be69eff31',
      cluster: 'ap1',
      encrypted: true
    });
    echo2.channel('user.'+localStorage.getItem(SystemConstants.CURRENT_USER) + '.friends')
    .listen('UserFriends', (e:IPlayer[])=>{
      console.log("channel user friends");
      this.accountServices.getListFriend(localStorage.getItem(SystemConstants.CURRENT_USER)); 
    });
  }
  toggleNtf(){
    this.showNotification = !this.showNotification;
    this.listShowNotification.map((noti) =>{
      noti.timeFromNow = moment(noti.timeSend).fromNow()
    });
    if(this.showNotification == true){
      this.toggleFL = false;
    }
  }
  toggleFriendList(){
    this.toggleFL = !this.toggleFL;
    if(this.toggleFL == true){
      this.showNotification = false;
    }
  }
  imgChatHover(){
    this.imgChat = "../../../assets/chat-hover.png";
  }
  imgChatLeave(){
    this.imgChat = "../../../assets/chat.png";
  }
  imgXHover(){
    this.imgX = "../../../assets/x-mark-hover.png";
  }
  imgXLeave(){
    this.imgX = "../../../assets/x-mark.png"; 
  }
  deleteFriend(id: number){
    const dialogRef = this.dialog.open(DialogDeleteFriendConfirm, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.accountServices.deleteFriend(localStorage.getItem(SystemConstants.CURRENT_USER),id).subscribe(res =>{
          if(res){
            this.listFriends = this.listFriends.filter(f => f.id != id);
            this.toastr.successToastr('Xóa bạn thành công', 'Thông báo',{
              position: 'top-right',
              animate: 'slideFromTop'
            });
          }else{
            this.toastr.errorToastr('Xóa bạn thất bại', 'Thông báo',{
              position: 'top-right',
              animate: 'slideFromTop'
            });
          }
        })
      }
      else{
        console.log("Cancel");
      }
    });
  }
  chat(id: any){  
    this.router.navigate([UrlConstants.CHAT]);
  }
}

@Component({
  selector: 'dialog-delete-friend-confirm',
  templateUrl: 'dialog-delete-friend-confirm.html',
})
export class DialogDeleteFriendConfirm {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteFriendConfirm>,
    @Inject(MAT_DIALOG_DATA) public player: IPlayer) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IConversation } from '../interfaces/iconversation';
import { ConversationService } from '../core/services/conversation.service';
import { SystemConstants } from '../core/common/system.constants';
import { forEach } from '@angular/router/src/utils/collection';
import { AccountService } from '../core/services/account.service';
import { IPlayer } from '../interfaces/IPlayer';
import { IMessage } from '../interfaces/imessage';
import { UrlConstants } from '../core/common/url.constants';
import * as Echo from 'laravel-echo' ;
import { Router } from '@angular/router';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { INotification } from '../interfaces/INotification';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu: number = 0;
  conversation: object[] = [{id: 1,message: 'hello'},{id: 2,message: 'hello baby'}];
  listConversations : IConversation[] = [];
  listUsers: any[] = [];
  showListSpinner: boolean = true;
  listMessages: IMessage[] = [];
  imgChat: string = "";
  messageString: string = "";
  conversationSelected: number = 0;
  userSelected: string = "";
  constructor(
    private conversationServices: ConversationService,
    private accountService: AccountService
    ) {this.subscribe();}

  ngOnInit() {
    this.conversationServices.Conversations.subscribe(res =>{
      if(res.length != 0){
        this.listConversations = res;
        this.listConversations.forEach(con => {
          console.log(con);
          con.withUser = <IPlayer>{};
          if(con.user_one + "" == localStorage.getItem(SystemConstants.CURRENT_USER)){
            this.accountService.getUserChatInfo(con.user_second).subscribe(u => {
              con.withUser = u;
              this.showListSpinner = false;
            });
          }else{
            this.accountService.getUserChatInfo(con.user_one).subscribe(u => {
              con.withUser = u;
              this.showListSpinner = false;
            });
          }
          this.conversationServices.getMessages(con.id).subscribe(m => {
            con.listMessage = m;
            con.listMessage.forEach(m => {
              if(m.from_user_id + "" == localStorage.getItem(SystemConstants.CURRENT_USER)){
                m.isReceived = false;
              }else{
                m.isReceived = true;
              }
            })
          });
        });
      }
    })
    this.conversationServices.getConversations(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  subscribe(){
    var echo = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: '2a8e4ee7091be69eff31',
      cluster: 'ap1',
      encrypted: true
    });
    echo.channel('conversation.'+ this.conversationSelected + '.messages')
      .listen('NewMessage', (e:IMessage[])=>{
        this.listMessages = e;
    });
  }
  sendMessage(){
    console.log(localStorage.getItem(SystemConstants.CURRENT_USER),
    this.userSelected,this.conversationSelected,this.messageString);
    const messageString = this.messageString;
    this.conversationServices.addMessage(localStorage.getItem(SystemConstants.CURRENT_USER),
    this.userSelected,this.conversationSelected,this.messageString).subscribe(res =>{
      console.log(res);
      this.listMessages.unshift({
        from_user_id: this.userSelected,
        to_user_id: localStorage.getItem(SystemConstants.CURRENT_USER),
        conversation_id: this.conversationSelected,
        message: messageString,
        isReceived: false
      });
      console.log(this.listMessages);
    });

    this.messageString = "";
  }
  getMessage(id: number){
    this.conversationSelected = id;
    this.listConversations.forEach(con =>{
      if(con.id === id){
        this.imgChat = con.withUser.ImgUrl;
        this.listMessages = con.listMessage;
        this.userSelected = con.withUser.id + "";
      }
    });
  }
}

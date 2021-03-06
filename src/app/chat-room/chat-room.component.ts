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
import { last } from 'rxjs/operators';
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
  conversationSelected: any = localStorage.getItem(SystemConstants.CURRENT_CONVERSATION);
  userSelected: string = "";
  isListening: boolean = false;
  newConversation: IConversation = {};
  gotListMessage: boolean = false;
  constructor(
    private conversationServices: ConversationService,
    private accountService: AccountService
    ) {}

  ngOnInit() {
    localStorage.removeItem(SystemConstants.CURRENT_CONVERSATION);
    this.subscribeNewConversation();
    this.conversationServices.Conversations.subscribe(res =>{
      if(res.length != 0){
        this.listConversations = res;
        this.listConversations.forEach(con => {
          if(!this.isListening){
            this.subscribe(con);
          }
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
          this.conversationServices.getMessages(con.id).subscribe(c => {
            con.listMessage = c;
            var gotLastMessage = false;
            con.listMessage.forEach(m => {
              var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
              if(regex.test(m.message)){
                m.isURLString = true;
              }else{
                m.isURLString = false;
              }
              if(m.from_user_id + "" == localStorage.getItem(SystemConstants.CURRENT_USER)){
                m.isReceived = false;
              }else{
                m.isReceived = true;
              }
              if(!gotLastMessage){
                con.lastMessage = m.message;
                gotLastMessage = true;
              }
            });
            gotLastMessage = false;
          });
        });
        this.isListening = true;
        if(!this.gotListMessage){
          this.listConversations.forEach(c =>{
            if(c.id +"" == this.conversationSelected){
              this.getMessage(this.conversationSelected);
            }
          });
          this.gotListMessage = true;
        }
      }
    })
    this.conversationServices.getConversations(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  subscribeNewConversation(){
    console.log("Dang lang nge conversation new");
    var name = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: 'adb004555d28bac39090',
      cluster: 'ap1',
      encrypted: true
    });
    name.channel('user.'+ localStorage.getItem(SystemConstants.CURRENT_USER) +'.conversations').listen('NewConversation', (e:any)=>{ 
      // if(e.id+"" != localStorage.getItem(SystemConstants.CURRENT_USER)){
      //   this.conversationServices.getConversations(localStorage.getItem(SystemConstants.CURRENT_USER));
      // }
      console.log("Da nhan duoc conversation moi");
      console.log(e.newConversation);
      this.newConversation = e.newConversation;
      this.subscribe(this.newConversation);
      this.newConversation.withUser = <IPlayer>{};
      if(this.newConversation.user_one + "" == localStorage.getItem(SystemConstants.CURRENT_USER)){
        this.accountService.getUserChatInfo(this.newConversation.user_second).subscribe(u => {
          this.newConversation.withUser = u;
          this.showListSpinner = false;
        });
      }else{
        this.accountService.getUserChatInfo(this.newConversation.user_one).subscribe(u => {
          this.newConversation.withUser = u;
          this.showListSpinner = false;
        });
      }
      this.newConversation.listMessage = [];
      this.newConversation.lastMessage = "";
      this.listConversations.unshift(this.newConversation);
    });
  }
  subscribe(conversations : IConversation){
    console.log("dang lang nghe conversation:"+  conversations.id);
    var name = new Echo({
      authEndpoint : 'http://127.0.0.1:8000/broadcasting/auth',
      broadcaster: 'pusher',
      key: 'adb004555d28bac39090',
      cluster: 'ap1',
      encrypted: true
    });
    name.channel('conversation.'+ conversations.id +'.messages').listen('NewMessage', (e:IMessage[])=>{ 
      if(e['message'].to_user_id == localStorage.getItem(SystemConstants.CURRENT_USER)){  
        this.listConversations.map(con => {
          if(con.id == conversations.id){
            let isUrl = false;
            var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
              if(regex.test(e['message'].message)){
                isUrl = true;
              }else{
                isUrl = false;
              }
            con.listMessage.unshift({
              from_user_id: e['message'].from_user_id,
              to_user_id: e['message'].to_user_id,
              conversation_id: e['message'].conversation_id,
              message: e['message'].message,
              isReceived: true,
              isURLString: isUrl
            });
            con.lastMessage = e['message'].message;
            var length = document.getElementById("box").scrollHeight;
            document.getElementById("box").scrollBy(0,length);
          } 
        }); 
      }
      // this.conversationServices.getMessages(e['message']);
    });
  }
  sendMessage(){
    if(this.messageString != ""){
      const messageString = this.messageString;
      let isUrl = false;
      var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
      if(regex.test(messageString)){
        isUrl = true;
      }
      this.listMessages.unshift({
        from_user_id: this.userSelected,
        to_user_id: localStorage.getItem(SystemConstants.CURRENT_USER),
        conversation_id: this.conversationSelected,
        message: messageString,
        isReceived: false,
        isURLString: isUrl
      });
      this.listConversations.forEach(con =>{
        if(con.id === this.conversationSelected){
          con.lastMessage = this.messageString;
        }
      });
      this.conversationServices.addMessage(localStorage.getItem(SystemConstants.CURRENT_USER),
      this.userSelected,this.conversationSelected,this.messageString).subscribe(res =>{
        console.log("Gui message thanh cong");
        var length = document.getElementById("box").scrollHeight;
        document.getElementById("box").scrollBy(0,length);
      });
      this.messageString = "";
    }
  }
  getMessage(id: any){
    this.conversationSelected = id;
    this.listConversations.forEach(con =>{
      if(con.id == id){
        console.log("vo roi");
        this.imgChat = con.withUser.ImgUrl;
        this.listMessages = con.listMessage;
        if(con.user_one +"" == (localStorage.getItem(SystemConstants.CURRENT_USER))){
          this.userSelected = con.user_second+"";
        }else{
          this.userSelected = con.user_one + "";
        }
      }
    });
    var length = document.getElementById("box").scrollHeight;
    document.getElementById("box").scrollBy(0,length);
  }
}



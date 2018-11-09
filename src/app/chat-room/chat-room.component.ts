import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IConversation } from '../interfaces/iconversation';
import { ConversationService } from '../core/services/conversation.service';
import { SystemConstants } from '../core/common/system.constants';
import { forEach } from '@angular/router/src/utils/collection';
import { AccountService } from '../core/services/account.service';
import { IPlayer } from '../interfaces/IPlayer';

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
  listUsers: IPlayer[] = [];
  constructor(
    private conversationServices: ConversationService,
    private accountService: AccountService
    ) { }

  ngOnInit() {
    this.conversationServices.Conversations.subscribe(res =>{
      this.listConversations = res;
      this.listConversations.forEach(con => {
        console.log(con);
        this.accountService.Users.subscribe(data =>{
          // console.log(res);
          // con.withUser = res[0];
           con.withUser = <IPlayer>data;
        });
        if(con.user_one + "" == localStorage.getItem(SystemConstants.CURRENT_USER)){
          this.accountService.getUserById(con.user_second);
        }else{
          this.accountService.getUserById(con.user_one);
        }
      })
    })
    this.conversationServices.getConversations(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  sendMessage(){
    console.log(this.listConversations);
  }
}

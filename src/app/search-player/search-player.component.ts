import { Component, OnInit, Inject } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';
import { AccountService } from '../core/services/account.service';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';  
import { ToastrManager } from 'ng6-toastr-notifications';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ChatService } from '../core/services/chat.service';
import { SystemConstants } from '../core/common/system.constants';

export interface message {
  to_user_id: number;
  message: string;
  type:number;
}


@Component({  
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {
  private requestMessage: message = {
    to_user_id: 0,
    message: '',
    type:1,
  };
  listWard :String[] = [];
  searchFilter : Boolean = false;
  isCloned : Boolean = false;
  listPlayerClone :IPlayer[] = [];
  toUserName: String = "";
  messages: String = "";
  listWardData = [
    { 
      id: 28,name:'TP.Hồ Chí Minh' , listWard: ['Quận 1','Quận 2','Quận 3','Quận 4','Quận 5',
            'Quận 6','Quận 7','Quận 8','Quận 9','Quận 10',
            'Quận 11','Quận 12','Quận Tân Bình','Quận Tân Phú',
            'Quận Phú Nhuận','Quận Gò Vấp','Quận Bình Thạnh',
            'Quận Thủ Đức' ,'Quận Bình Tân','Huyện Hóc Môn',
            'Huyện Củ Chi' ,'Huyện Nhà Bè' ,'Huyện Bình Chánh',
            'Huyện Cần Giờ']
    },
    { 
      id: 24 ,name:'Hà Nội', listWard: ['Quận Thanh Xuân','Quận Tây Hồ','Quận Nam Từ Liêm','Quận Long Biên',
          'Quận Hoàng Mai','Quận Hoàn Kiếm','Quận Hai Bà Trưng','Quận Hà Đông',
          'Quận Đống Đa','Quận Cầu Giấy','Quận Bắc Từ Liêm','Quận Ba Đình',
          'Thị xã Sơn Tây','Huyện Ưng Hòa','Huyện Thường Tín','Huyện Thanh Trì','Huyện Thanh Oai',
          'Huyện Thạch Thất','Huyện Sóc Sơn','Huyện Quốc Oai','Huyện Phúc Thọ','Huyện Phú Xuyên',
          'Huyện Mỹ Đức','Huyện Mê Linh','Huyện Hoài Đức','Huyện Gia Lâm','Huyện Đông Anh',
          'Huyện Đan Phượng','Huyện Chương Mỹ','Huyện Ba Vì']
    } 
  ];
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
  selectedMenu : number = 2;
  
  listPlayerResult: IPlayer[]= [];
  playerFocusing: IPlayer = {};
  playerCity: String = "";
  playerAge: number = 0;
  filterPlayer: string = "";

  listPlayers : IPlayer[];
  showSpinner : boolean = true;
  constructor(
    private accountServices : AccountService,
    private router: Router,
    private toastr: ToastrManager,
    public dialog: MatDialog,
    private chatService: ChatService 
  ) { 
  }
  ngOnInit() {
    // this.chatService.message.subscribe(msg => {
    //   console.log("Respone from websocket server" + msg);
    // })
    this.accountServices.listUsers.subscribe(data => {
      if(data.length == 0){
        this.accountServices.getUsersFromServer();
      }else{
        this.listPlayerResult = data;
        this.showSpinner = false;
      }
    });
  }
  changeSelection(ply: IPlayer){
    this.playerFocusing = ply;
    this.playerAge = (new Date().getFullYear() - new Date(ply.DateOfBirth).getFullYear());
  }

  changeCity(val: number){
     (val == 28) ? (this.listWard = this.listWardData.find(x => x.id == 28).listWard) : 
                  (this.listWard = this.listWardData.find(x => x.id == 24).listWard);
  }
  findPlayer(city?: number,ward?: String,age?: string){
    (!this.isCloned)? (this.listPlayerClone = this.listPlayerResult): (this.listPlayerResult = this.listPlayerClone);
    if(city && ward && age){
      this.listPlayerResult = this.listPlayerResult.filter(player => 
        player.City == this.listWardData.filter(item => item.id == city)[0]['name'] && 
        player.Ward == ward &&
        (new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear()) >= parseInt(age) - 5  &&
        (new Date().getFullYear() - new Date(player.DateOfBirth).getFullYear()) <= parseInt(age) + 5
        );
    }                                         
    this.searchFilter = true;
    this.isCloned = true;
  }
  resetFilter() : void{
    this.listPlayerResult = this.listPlayerClone;
  }
  viewDetail(id :any){
    this.showSpinner = true;
    this.accountServices.getUserById(id);
    this.accountServices.getUserPowers(id);
    this.accountServices.getUsersTeams(id); 
    this.accountServices.getUserPositions(id);
    setTimeout(()=>{
      this.router.navigate([UrlConstants.PLAYER_DETAILS + '/' + id])
    },2000);
  }

  addFriend(id: any){
    const dialogRef = this.dialog.open(DialogFriendRequestMessages, {
      width: '250px',
      data: {message: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.requestMessage.to_user_id = id;
      this.requestMessage.message = result;
      console.log(this.requestMessage);
      this.accountServices.addFriendRequest(localStorage.getItem(SystemConstants.CURRENT_USER),this.requestMessage.to_user_id,this.requestMessage.message);
    });
    // this.toastr.successToastr('Đã gửi lời mời kết bạn', 'Thông báo',{
    //   position: 'top-right',
    //   animate: 'slideFromTop'
    // })
  }
  sendMsg(){
    //this.chatService.message.next(this.requestMessage);
  }
}


@Component({
  selector: 'dialog-friend-request-messages',
  templateUrl: 'dialog-friend-request-message.html',
})
export class DialogFriendRequestMessages {

  constructor(
    public dialogRef: MatDialogRef<DialogFriendRequestMessages>,
    @Inject(MAT_DIALOG_DATA) public data: message) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}


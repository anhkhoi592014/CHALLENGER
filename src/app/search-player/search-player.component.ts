import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';
import { AccountService } from '../core/services/account.service';
import { SystemConstants } from '../core/common/system.constants';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {
  listWard :String[] = [];
  searchFilter : Boolean = false;
  isCloned : Boolean = false;
  listPlayerClone :IPlayer[] = [];
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
    {id:1,code:'tct', title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    {id:2,code:'tdb', title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu : number = 1;
  
  listPlayerResult: IPlayer[]= [
    {Fullname : 'Nguyễn Văn Tèo',ImgUrl : '../../assets/player01.png',MainPosition: 'Thủ môn',Status : 1,CityId: 28  ,Ward : "Quận Gò Vấp",Age : 20},
    {Fullname : 'Vương Vũ Anh Khôi',ImgUrl : '../../assets/player02.png',MainPosition: 'Tiền đạo', Status : 0,CityId: 28 ,Ward : "Quận 12", Age: 32},
    {Fullname : 'Paul Pogba',ImgUrl : '../../assets/player03.png',MainPosition: 'Tiền vệ', Status : 0,CityId: 24 ,Ward : "Quận Cầu Giấy", Age: 25}
  ];
  playerFocusing : IPlayer = this.listPlayerResult[0];
  playerCity : String = this.listWardData.filter(city => city.id == this.playerFocusing.CityId)[0].name;
  
  filterPlayer: string = "";

  listPlayers : IPlayer[];
  constructor(
    private accountServices : AccountService,
    private router: Router
  ) { }
  ngOnInit() {
    this.accountServices.Users.subscribe(data => {
      this.listPlayerResult = data;
    });
    this.accountServices.getUsersFromServer();
  }
  
  changeSelection(ply: IPlayer){
    this.playerFocusing = ply;
    if(this.listWardData.filter(city => city.id == this.playerFocusing.CityId)[0])
    {
      this.playerCity = this.listWardData.filter(city => city.id == this.playerFocusing.CityId)[0].name; 
    }
  }

  changeCity(val: number){
     (val == 28) ? (this.listWard = this.listWardData.find(x => x.id == 28).listWard) : 
                  (this.listWard = this.listWardData.find(x => x.id == 24).listWard);
  }
  findPlayer(city?: number,ward?: String,age?: string){
    (!this.isCloned)? (this.listPlayerClone = this.listPlayerResult): (this.listPlayerResult = this.listPlayerClone);
    if(city && ward && age){
      this.listPlayerResult = this.listPlayerResult.filter(player => 
        player.CityId == city && 
        player.Ward == ward && 
        player.Age >= parseInt(age) - 5  &&
        player.Age <= parseInt(age) + 5
        );
    }                                           
    this.searchFilter = true;
    this.isCloned = true;
  }
  resetFilter() : void{
    this.listPlayerResult = this.listPlayerClone;
  }
  viewDetail(id :any){
    localStorage.removeItem("SELF_DETAIL");
    localStorage.setItem(SystemConstants.ViewDetailUserId,<string>id);
    this.router.navigate([UrlConstants.PLAYER_DETAILS]);
  }
}

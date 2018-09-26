import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';
@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {

  constructor() { }
  listWard :String[] = [];
  searchFilter : Boolean = false;
  isCloned : Boolean = false;
  listPlayerClone :IPlayer[] = [];
  listWardData = [
    { 
      id: 28 , listWard: ['Quận 1','Quận 2','Quận 3','Quận 4','Quận 5',
            'Quận 6','Quận 7','Quận 8','Quận 9','Quận 10',
            'Quận 11','Quận 12','Quận Tân Bình','Quận Tân Phú',
            'Quận Phú Nhuận','Quận Gò Vấp','Quận Bình Thạnh',
            'Quận Thủ Đức' ,'Quận Bình Tân','Huyện Hóc Môn',
            'Huyện Củ Chi' ,'Huyện Nhà Bè' ,'Huyện Bình Chánh',
            'Huyện Cần Giờ']
    },
    { 
      id: 24 , listWard: ['Quận Thanh Xuân','Quận Tây Hồ','Quận Nam Từ Liêm','Quận Long Biên',
          'Quận Hoàng Mai','Quận Hoàn Kiếm','Quận Hai Bà Trưng','Quận Hà Đông',
          'Quận Đống Đa','Quận Cầu Giấy','Quận Bắc Từ Liêm','Quận Ba Đình',
          'Thị xã Sơn Tây','Huyện Ưng Hòa','Huyện Thường Tín','Huyện Thanh Trì','Huyện Thanh Oai',
          'Huyện Thạch Thất','Huyện Sóc Sơn','Huyện Quốc Oai','Huyện Phúc Thọ','Huyện Phú Xuyên',
          'Huyện Mỹ Đức','Huyện Mê Linh','Huyện Hoài Đức','Huyện Gia Lâm','Huyện Đông Anh',
          'Huyện Đan Phượng','Huyện Chương Mỹ','Huyện Ba Vì']
    } 
  ];
  listMenu : IMenu[] = [
    { title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    { title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    { title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    { title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  
  listPlayerResult: IPlayer[]= [
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png',position: 'Thủ môn',status : true ,cityId: 28  ,ward : "Quận Gò Vấp",age : 20},
    {name : 'Vương Vũ Anh Khôi',imgUrl : '../../assets/player02.png',position: 'Tiền đạo', status : false ,cityId: 28 ,ward : "Quận 12", age: 32}
  ];
  playerFocusing : IPlayer = this.listPlayerResult[0];
  
  filterPlayer: string = "";
  ngOnInit() {
  }
  changeSelection(ply: IPlayer){
    this.playerFocusing = ply;
  }
  changeCity(val: number){
     (val == 28) ? (this.listWard = this.listWardData.find(x => x.id == 28).listWard) : 
                  (this.listWard = this.listWardData.find(x => x.id == 24).listWard);
  }
  findPlayer(city?: number,ward?: String,age?: string){
    (!this.isCloned)? (this.listPlayerClone = this.listPlayerResult): (this.listPlayerResult = this.listPlayerClone);
    if(city && ward && age){
      
      this.listPlayerResult = this.listPlayerResult.filter(player => 
        player.cityId == city && 
        player.ward == ward && 
        player.age >= parseInt(age) - 5  &&
        player.age <= parseInt(age) + 5
        );
    }                                           
    this.searchFilter = true;
    this.isCloned = true;
  }
  resetFilter() : void{
    this.listPlayerResult = this.listPlayerClone;
  }
}

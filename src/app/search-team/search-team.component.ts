import { Component, OnInit } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { ITeam } from '../interfaces/ITeam';
import { IPlayer } from '../interfaces/IPlayer';
import { AccountService } from '../core/services/account.service';

@Component({
  selector: 'app-search-team',
  templateUrl: './search-team.component.html',
  styleUrls: ['./search-team.component.scss']
})
export class SearchTeamComponent implements OnInit {

  listTeamsResult : ITeam[] =[
    {id : 1, Fullname : "asdasd", ImgUrl : "../../assets/logo01.png"}
  ];
  listWard :String[] = [];
  filterPlayer: string = "";
  searchFilter : Boolean = false;
  isCloned : Boolean = false;
  listTeamClone :ITeam[] = [];

  listMenu : IMenu[] = [
    {id:1,code:'tct', title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    {id:2,code:'tdb', title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    {id:3,code:'db', title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  selectedMenu :number = 2;
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

  teamFocusing : ITeam = this.listTeamsResult[0];
  filterTeam: string = "";

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit() {
    this.accountService.Teams.subscribe(res => {
      this.listTeamsResult = res;
    })
    this.accountService.getTeamsFromServer();
  }
  test(){
    console.log(this.listTeamsResult);
  }
  changeCity(val: number){
    (val == 28) ? (this.listWard = this.listWardData.find(x => x.id == 28).listWard) : 
                 (this.listWard = this.listWardData.find(x => x.id == 24).listWard);
 }

  changeSelection(team: ITeam){
    this.teamFocusing = team;
  }
}

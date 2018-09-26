import { Component, OnInit } from '@angular/core';
import { Menu } from '../menu';
import { Player } from '../player';
@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {

  constructor() { }
  listMenu : Menu[] = [
    { title : 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' },
    { title : 'Đội bóng',imgUrl : '../../assets/doibong.png' },
    { title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    { title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  
  listPlayerResult: Player[]= [
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true},
    {name : 'Nguyễn Văn Tèo',imgUrl : '../../assets/player01.png', status : true}
  ];

  ngOnInit() {
  }

}

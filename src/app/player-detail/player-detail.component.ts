import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  
  listMenu : IMenu[] = [
    { id: 1, title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' },
  ];
  selectedMenu :number = 1;
  //@Input() player : IPlayer;
  player : IPlayer =
  {
    name : 'Nguyễn Văn Tèo',
    imgUrl : '../../assets/player01.png',
    position: 'Thủ môn',
    status : true ,
    cityId: 28  ,
    ward : "Quận Gò Vấp",
    age : 20 ,
    height: "1m9",
    weight: 70,
    facebook: "anhkhoi592014@gmail.com",
    sucmanh: 40,
    tocdo: 80,
    kheoleo: 100,
    tatbong: 50,
    dutdiem: 65,
    chuyenngan: 87,
    sutxa: 20,
    danhdau: 20,
    chonvitri: 100
  };

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.setProgressbar(), 200);
  }
   
  setProgressbar() :void{
    var after = document.getElementsByClassName('after') as HTMLCollectionOf<HTMLElement>;
    for(var i = 0 ; i < after.length ; i++){
      var percent = parseInt((after[i].dataset.percent));
      after[i].style.transition = "1s cubic-bezier(.24,.72,.35,1.01),-webkit- 1s cubic-bezier(.24,.72,.35,1.01)";
      after[i].style.width = percent + "%"; 
    }
  }


}

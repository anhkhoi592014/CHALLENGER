import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { IPlayer } from '../interfaces/IPlayer';
import { AccountService } from '../core/services/account.service';
import { SystemConstants } from '../core/common/system.constants';
import { IPower } from '../interfaces/ipower';
import { ITeam } from '../interfaces/ITeam';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png'},
    { id: 2,code:'csttcn', title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 1;
  constructor(
    private route: ActivatedRoute
  ) { 
    this.route.params.subscribe(param => {
      (param['id'] && (param['id'] != localStorage.getItem(SystemConstants.CURRENT_USER)))? 
      this.listMenu = [{ id: 3,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }] : '';  
    });
  }
  ngOnInit() {
  }


}

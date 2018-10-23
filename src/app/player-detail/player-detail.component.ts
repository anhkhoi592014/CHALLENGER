import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { SystemConstants } from '../core/common/system.constants';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {
  
  constructor() { 
  }
  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { SystemConstants } from '../core/common/system.constants';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { ISubMenu } from '../interfaces/ISubMenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() listMenu: IMenu[];
  @Input() selectedMenu : number;
  constructor(
    private authenService:AuthenService,
    private router:Router,
    private location:Location
  ) { }

  ngOnInit() {
  }
  clickMenu(code:string){ 
    if(code == 'dx'){
      this.authenService.logout();
      this.router.navigate([UrlConstants.LOGIN]);
    }
    else if(code =='back'){
      this.router.navigate([UrlConstants.DASHBOARD]);
    }
    else if(code == 'tct'){
      this.router.navigate([UrlConstants.SEARCH_PLAYER]);
    }
    else if(code == 'tdb'){
      this.router.navigate([UrlConstants.SEARCH_TEAM]);
    }
    else if(code == 'ttcn'){
      this.router.navigate([UrlConstants.PLAYER_DETAILS]);
    }else if(code =='dashboard'){
      this.router.navigate([UrlConstants.DASHBOARD]);
    }else if(code =='csttcn'){
      this.router.navigate([UrlConstants.EDIT_PLAYER_DETAILS]);
    }
  }
  hoverMenuItem(code: String){
    
  }
}

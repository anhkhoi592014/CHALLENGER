import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { Router } from '@angular/router';
import { UrlConstants } from '../../core/common/url.constants';
import { AuthenService } from '../../core/services/authen.service';
import { SystemConstants } from '../../core/common/system.constants';

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
    private router:Router
  ) { }

  ngOnInit() {
  }

  clickMenu(code:string,id?:number){ 
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
    else if(code == 'db'){
      this.router.navigate([UrlConstants.TEAMS]);
    }
    else if(code == 'ttcn'){
      this.router.navigate([UrlConstants.PLAYER_DETAILS]);
      this.selectedMenu = id;
    }else if(code =='dashboard'){
      this.router.navigate([UrlConstants.DASHBOARD]);
    }else if(code =='csttcn'){
      this.router.navigate([UrlConstants.EDIT_PLAYER_INFO]);
      this.selectedMenu = id;
    }else if(code =='dmk'){
      this.router.navigate([UrlConstants.CHANGE_PLAYER_PASSWORD]);
      this.selectedMenu = id;
    }else if(code == 'editpf'){
      this.router.navigate([UrlConstants.EDIT_PLAYER_INFO]);
      this.selectedMenu = id;
    }else if(code == 'editcscn'){
      this.selectedMenu = id;
      this.router.navigate([UrlConstants.EDIT_PLAYER_POWER]);
    }else if(code == 'ttdb'){
      if(localStorage.getItem(SystemConstants.CURRENT_TEAM)){
        this.router.navigate([UrlConstants.TEAM_DETAILS +"/"+ localStorage.getItem(SystemConstants.CURRENT_TEAM)]);  
      }else{
        this.router.navigate([UrlConstants.DASHBOARD]);
      }
    }else if(code == 'tlsd'){
      this.router.navigate([UrlConstants.TEAM_DETAILS +"/"+ localStorage.getItem(SystemConstants.CURRENT_TEAM) + "/history-match"]);
    }else if(code == 'tdh'){
      this.router.navigate([UrlConstants.TEAM_DETAILS +"/"+ localStorage.getItem(SystemConstants.CURRENT_TEAM) + "/formation"]);
    }else if(code == 'qld'){
      this.router.navigate([UrlConstants.TEAM_DETAILS +"/"+ localStorage.getItem(SystemConstants.CURRENT_TEAM) + "/manage"]);
    }
  }
  hoverMenuItem(code: String){
    
  }
}

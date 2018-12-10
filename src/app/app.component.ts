import { Component, OnDestroy } from '@angular/core';
import { AuthenService } from './core/services/authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'CHALLENGER';
  constructor( private authenService: AuthenService){}
  ngOnDestroy(){
    this.authenService.logout().subscribe();
  }
}

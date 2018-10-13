import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { SystemConstants } from '../core/common/system.constants';
import { AuthenService } from '../core/services/authen.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model : any ={
    username : '',
    password: ''
  };

  constructor(
    private router:Router,
    private authenService:AuthenService
  ) { }

  ngOnInit() {
  }
  
  login():void{
    this.authenService.login(this.model.username,this.model.password).subscribe(res=>{
      res ? this.router.navigate([UrlConstants.DASHBOARD]) : console.log("khong dung tai khoan hoac mat khau");
    })
  }
}

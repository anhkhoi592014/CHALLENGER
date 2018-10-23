import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { ToastrManager } from 'ng6-toastr-notifications';
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
    public toastr: ToastrManager,
    private router:Router,
    private authenService:AuthenService
  ) { }

  ngOnInit() {
  }
  
  login():void{
    this.authenService.login(this.model.username,this.model.password).subscribe(res=>{
      if(res){
        this.router.navigate([UrlConstants.DASHBOARD]);
      }else{
        this.toastr.errorToastr('Tài khoản hoặc mật khẩu không chính xác.', 'Lỗi !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
      }
    })
  }
}

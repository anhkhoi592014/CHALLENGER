import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { AccountService } from 'src/app/core/services/account.service';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IMenu } from 'src/app/interfaces/IMenu';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UrlConstants } from 'src/app/core/common/url.constants';
 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword: string = "";
  newPassword: string = "";
  cfNewPassword: string = "";
  player: IPlayer = {};
  wrongPassword:boolean = false;
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png' },
    { id: 2,code:'editpf' ,title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code: 'editcscn' ,title: 'Chỉ số cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { id: 4,code:'dmk', title: 'Đổi mật khẩu',imgUrl : '../../assets/password.png'},
    { id: 5,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 4;
  constructor(public toastr: ToastrManager,
    private router: Router,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.accountService.Users.subscribe(res =>{
      this.player = <IPlayer>res;
    });
    this.accountService.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
  }

  onSubmit(){
    this.wrongPassword = false;
    if(this.oldPassword == this.player.password){
      this.accountService.changePassword(localStorage.getItem(SystemConstants.CURRENT_USER),this.newPassword).subscribe(res =>{
        if(res){
          this.toastr.successToastr('Đỗi mật khẩu thành công.', 'Thành công!',{
            position: 'top-right',
            animate: 'slideFromTop'
          });
          this.router.navigate([UrlConstants.PLAYER_DETAILS]);
        }else{
          this.toastr.errorToastr('Đỗi mật khẩu thất bại.', 'Lỗi!',{
            position: 'top-right',
            animate: 'slideFromTop'
          });
          this.router.navigate([UrlConstants.PLAYER_DETAILS]);
        }
      });
    }else{
      this.toastr.errorToastr('Mật khẩu cũ không chính xác.', 'Lỗi!',{
        position: 'top-right',
        animate: 'slideFromTop'
      });
    }
  }
}

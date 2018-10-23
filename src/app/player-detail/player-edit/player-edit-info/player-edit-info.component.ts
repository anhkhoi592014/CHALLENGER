import { Component, OnInit, AfterViewInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { ITeam } from 'src/app/interfaces/ITeam';
import { AccountService } from 'src/app/core/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { PositionService } from 'src/app/core/services/position.service';
import { IUserPosition } from 'src/app/interfaces/iuser-position';
import { UrlConstants } from 'src/app/core/common/url.constants';
import { ToastrManager } from 'ng6-toastr-notifications';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';

@Component({
  selector: 'app-player-edit-info',
  templateUrl: './player-edit-info.component.html',
  styleUrls: ['./player-edit-info.component.scss']
})
export class PlayerEditInfoComponent  implements OnInit, AfterContentChecked {
  
  player : IPlayer;
  listTeams: ITeam[] = [];
  imgUrl: string = "";
  selectedFile: File = null;
  showSpinner: boolean = true;
  listMenu : IMenu[] = [
    { id: 1,code:'ttcn', title: 'Thông tin cá nhân',imgUrl : '../../assets/viewdetails.png' },
    { id: 2,code:'editpf' ,title: 'Chỉnh sữa',imgUrl : '../../assets/editprofies.png'},
    { id: 3,code:'editcscn' ,title: 'Chỉ số cầu thủ',imgUrl : '../../assets/timcauthu.png' },
    { id: 4,code:'dmk', title: 'Đổi mật khẩu',imgUrl : '../../assets/password.png'},
    { id: 5,code:'back', title : 'Quay Lại',imgUrl : '../../assets/left-arrow.png' }
  ];
  selectedMenu: number = 2;
  
  listWardData = [
    { 
      id: 28,name:'TP.Hồ Chí Minh' , listWard: ['Quận 1','Quận 2','Quận 3','Quận 4','Quận 5',
            'Quận 6','Quận 7','Quận 8','Quận 9','Quận 10',
            'Quận 11','Quận 12','Quận Tân Bình','Quận Tân Phú',
            'Quận Phú Nhuận','Quận Gò Vấp','Quận Bình Thạnh',
            'Quận Thủ Đức' ,'Quận Bình Tân','Huyện Hóc Môn',
            'Huyện Củ Chi' ,'Huyện Nhà Bè' ,'Huyện Bình Chánh',
            'Huyện Cần Giờ']
    },
    { 
      id: 24 ,name:'Hà Nội', listWard: ['Quận Thanh Xuân','Quận Tây Hồ','Quận Nam Từ Liêm','Quận Long Biên',
          'Quận Hoàng Mai','Quận Hoàn Kiếm','Quận Hai Bà Trưng','Quận Hà Đông',
          'Quận Đống Đa','Quận Cầu Giấy','Quận Bắc Từ Liêm','Quận Ba Đình',
          'Thị xã Sơn Tây','Huyện Ưng Hòa','Huyện Thường Tín','Huyện Thanh Trì','Huyện Thanh Oai',
          'Huyện Thạch Thất','Huyện Sóc Sơn','Huyện Quốc Oai','Huyện Phúc Thọ','Huyện Phú Xuyên',
          'Huyện Mỹ Đức','Huyện Mê Linh','Huyện Hoài Đức','Huyện Gia Lâm','Huyện Đông Anh',
          'Huyện Đan Phượng','Huyện Chương Mỹ','Huyện Ba Vì']
    } 
  ];
  
  playerFocusing: IPlayer = {};
  playerCity: String = "";
  listWard :String[] = [];
  dateOfBirth: string = null;
  listPosition: Object[] = [];
  playerPosition: IUserPosition[] = [];
  mainUserPosition: IUserPosition = null;
  extraUserPosition: IUserPosition = null;
  extraPositionId: number = 0;

  test = true;
  constructor(
    private accountServices : AccountService,
    private positionServices : PositionService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrManager
    ) { }

  ngOnInit() {
    this.accountServices.Users.subscribe(res => {
      this.player = <IPlayer>res;   
      this.imgUrl = <string>this.player.ImgUrl;
      this.dateOfBirth = new Date(this.player.DateOfBirth).getFullYear().toString() + '-' 
      +  ((new Date(this.player.DateOfBirth).getMonth() + 1 < 10) ? '0' + new Date(this.player.DateOfBirth).getMonth() + 1 : new Date(this.player.DateOfBirth).getMonth() + 1)+'-'
      + ((new Date(this.player.DateOfBirth).getDate() + 1 < 10) ? '0' + new Date(this.player.DateOfBirth).getDate().toString() : new Date(this.player.DateOfBirth).getDate().toString())
      ;
    });
    this.accountServices.Teams.subscribe(res => {
      this.listTeams = <ITeam[]>res;
    });
    this.positionServices.Positions.subscribe(res =>{
      this.listPosition = <Object[]>res;   
    });
    this.accountServices.Positions.subscribe(res =>{
      this.playerPosition = <IUserPosition[]>res; 
      this.mainUserPosition = this.playerPosition.filter(p => p.TypeCode == "MP")[0]; 
      if((this.extraUserPosition = this.playerPosition.filter(p => p.TypeCode == "EP")[0])){
        this.extraPositionId = this.extraUserPosition.position_id;
      }
      this.showSpinner = false;
      
    });
    this.accountServices.getUserById(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
    this.positionServices.getPositionsFromServer();
    this.accountServices.getUserPositions(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  ngAfterContentChecked(): void {
    this.listWard = this.listWardData.find(data => data.name == this.player.City).listWard;
  }
  
  changeCity(val: number){
    if(val == 28){
      this.player.City = 'TP.Hồ Chí Minh';
      this.listWard = this.listWardData.find(x => x.id == 28).listWard;
    }else if(val == 24){
      this.player.City = 'Hà Nội';
      this.listWard = this.listWardData.find(x => x.id == 24).listWard;
    }
    this.changeWard(this.listWard[0].toString());
  }

  abort(){
    this.router.navigate([UrlConstants.PLAYER_DETAILS]);
  }
  // Cập nhập giới tính
  changeSex(sex: number){
    this.player.Sex = sex;
  }

  // Cập nhập ngày sinh
  changeDOB(){
    this.player.DateOfBirth = new Date(this.dateOfBirth);
  }

  // Cập nhập hình đại diện
  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
    this.player.ImgUrl = "../../assets/" + this.selectedFile.name;
  }

  // Cập nhập Quận
  changeWard(ward: string){
    this.player.Ward = ward;
  }

  // Cập nhập mô tả
  changeDescription(str: string){
    this.player.Description = str;
  }

  // Cập nhập vị trí chính
  changeMP(id: number){
    if(this.mainUserPosition){
      this.mainUserPosition.position_id = id;  
    }else{
      this.mainUserPosition = {
        position_id : id
      }
    }
  }
  changeEP(id: number){
    if(this.extraUserPosition){
        this.extraUserPosition.position_id = id;
        this.extraPositionId = id;
      }else{
        this.extraUserPosition = {
          position_id : id
      }
    }
    this.extraPositionId = id;
  }

  uploadFile(){
    this.imgUrl = '../../assets/' + this.selectedFile.name;
  }
  

  save(){
    (this.mainUserPosition.id) ? 
    this.positionServices.updateUserMainPosition(this.mainUserPosition.id,this.mainUserPosition.position_id,localStorage.getItem(SystemConstants.CURRENT_USER)) : 
    this.positionServices.addUserMainPosition(this.mainUserPosition.position_id,localStorage.getItem(SystemConstants.CURRENT_USER));
    if(this.extraPositionId > 0){
      (this.extraUserPosition.id) ?
      this.positionServices.updateUserExtraPosition(this.extraUserPosition.id,this.extraUserPosition.position_id,localStorage.getItem(SystemConstants.CURRENT_USER)) :
      this.positionServices.addUserExtraPosition(this.extraUserPosition.position_id,localStorage.getItem(SystemConstants.CURRENT_USER));  
    }else{
      this.positionServices.deleteUserExtraPosition(this.extraUserPosition.id);
    }
    
    
    this.accountServices.editProfile(this.player,localStorage.getItem(SystemConstants.CURRENT_USER)).subscribe(res => {
      if(res){
        this.toast.successToastr('Sữa thông tin thành công.', 'Thông báo !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.router.navigate([UrlConstants.PLAYER_DETAILS]);
      }else{
        this.toast.errorToastr('Sữa thông tin thất bại.', 'Thông báo !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
      }
    });
  }
}

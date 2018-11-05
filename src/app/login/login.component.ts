import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { AuthenService } from '../core/services/authen.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { IPlayer } from '../interfaces/IPlayer';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../core/services/account.service';
import { PositionService } from '../core/services/position.service';
import { IPosition } from '../interfaces/iposition';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registionForm = this.fb.group({
    username: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    password: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    fullname: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    email: ['',[Validators.required,Validators.email]]
  });
  updateInfoForm = this.fb.group({
    
  });
  model : any ={
    username : '',
    password: ''
  };
  info: IPlayer = {};
  showLogin: boolean = true;
  showRegis: boolean = false;
  showInfoUpdate: boolean = false;
  showNameRq: boolean = false;
  showFullnameRq: boolean = false;
  showPasswordRq: boolean = false;
  showEmailRq: boolean = false;
  addSuccess: boolean = true;
  showSpinner: boolean = false;
  positionData: IPosition[] = [];
  selectedFile: File = null;
  imgUrl: SafeUrl = "../../assets/unknown.jpg";
  imgPlayer: string = "";
  uploadedImage: Blob;
  imagePreview: string;
  dateOfBirth: string = "1995-01-01";
  mainPositionId : number = 1;
  constructor(
    private toastr: ToastrManager,
    private router:Router,
    private authenService:AuthenService,
    private accountServices: AccountService,
    private positionServices: PositionService,
    private fb: FormBuilder,
    private ng2ImgMax: Ng2ImgMaxService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.positionServices.listPositions.subscribe(res => {
      if(res.length == 0){
        this.positionServices.getPositionsFromServer();
      }else{
        this.positionData = <IPosition[]>res;
      }
    });
  }
  
  showRegister(){
   this.showRegis = true; 
   this.showLogin = false;
   this.showInfoUpdate = false;
  }
  return(){
    this.showRegis = false;
    this.showLogin = true;
    this.showInfoUpdate = false;
  }
  login():void{
    this.showSpinner = true;
    this.authenService.login(this.model.username,this.model.password).subscribe(res=>{
      if(res){
        this.router.navigate([UrlConstants.DASHBOARD]);
        this.showSpinner = false;
      }else{
        this.toastr.errorToastr('Tài khoản hoặc mật khẩu không chính xác.', 'Lỗi !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.showSpinner = false;
      }
    })
  }
  onSubmit(){ 
    this.showSpinner = true;
    this.accountServices.checkUser(
      this.registionForm.value.username,
      this.registionForm.value.password,
      this.registionForm.value.fullname,
      this.registionForm.value.email).subscribe((res) =>{
        if(res.length > 0){
          res.forEach(e => {
            if(e == -1){
              this.toastr.errorToastr('Tài khoản đã có người sử dụng.', 'Lỗi !!!',{
                position: 'top-right',
                animate: 'slideFromTop'
              });
              this.addSuccess = false;
              this.showSpinner = false;      
              this.registionForm.patchValue({username: ""});
              this.registionForm.patchValue({password: ""});                  
            }else if(e == -2){
              this.toastr.errorToastr('Email đã có người sử dụng.', 'Lỗi !!!',{
                position: 'top-right',
                animate: 'slideFromTop'
              });
              this.registionForm.patchValue({email: ""});
              this.registionForm.patchValue({password: ""});   
              this.addSuccess = false;
              this.showSpinner = false;
            }else if(e == 1){
              this.addSuccess = true;
            }
          });
          if(this.addSuccess){
            this.showSpinner = false;
            this.info.UserName = this.registionForm.value.username;
            this.info.password = this.registionForm.value.password;
            this.info.Fullname = this.registionForm.value.fullname;
            this.info.Email = this.registionForm.value.email;
            this.info.DateOfBirth = "1995-01-01";
            this.info.Sex = 0;
            this.info.ImgUrl = "../../assets/unknown.jpg";
            this.showInfoUpdate = true;
            this.showRegis = false;
            this.showLogin = false;
          }
        }
      });
  }
  changeSex(sex: number){
    this.info.Sex = sex;
  }
  // Cập nhập ngày sinh
  changeDOB(value : string){
    console.log(value);
    this.info.DateOfBirth = value;
  }
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
  }
  onFileSelected(event: any){
    this.imgPlayer = event.target.files[0].name;
    this.info.ImgUrl = "../../assets/" + this.imgPlayer;
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image,150,150).subscribe(result => {
      this.getImagePreview(new File([result], result.name));
    },
      error =>{
        console.log("Khong resize duoc",error);
      }
    );
  }
  onChangePosition(p : any){
    this.mainPositionId = p;
  }
  uploadFile(){
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(this.imagePreview);
  }
  
  onUpdateSubmit(){
    this.showSpinner = true;
    this.accountServices.addUser(this.info).subscribe(res => {
      if(res){
        this.accountServices.addUserMainPosition(this.mainPositionId,res.id);
        this.toastr.successToastr('Tạo tài khoản thành công', 'Success !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.showSpinner = false;
        this.showInfoUpdate = false;
        this.showRegis = false;
        this.showLogin = true;
      }else{
        this.toastr.errorToastr('Tạo tài khoản thất bại.', 'Lỗi !!!',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
      }
    });
  }

  showNameRequire(){
    this.showNameRq = true;
  }
  hideNameRequire(){
    this.showNameRq = false;
  }
  showPasswordRequire(){
    this.showPasswordRq = true;
  }
  hidePasswordRequire(){
    this.showPasswordRq = false;
  }
  showFullnameRequire(){
    this.showFullnameRq = true;
  }
  hideFullnameRequire(){
    this.showFullnameRq = false;
  }
  showEmailRequire(){
    this.showEmailRq = true;
  }
  hideEmailRequire(){
    this.showEmailRq = false;
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';
import { AccountService } from '../core/services/account.service';
import { ITeam } from '../interfaces/ITeam';
import { SystemConstants } from '../core/common/system.constants';
import { Router } from '@angular/router';
import { UrlConstants } from '../core/common/url.constants';
import { TeamService } from '../core/services/team.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  listMenu : IMenu[] = [
    {id:1,code:'dashboard', title : 'Dashboard',imgUrl : '../../assets/mapView.png' },
    {id:2,code:'tk', title : 'Tìm kiếm',imgUrl : '../../assets/loop.png',subMenu :[
      { code:'tct' ,title: 'Tìm cầu thủ',imgUrl : '../../assets/timcauthu.png' },
      { code:'tdb',title : 'Tìm đội bóng',imgUrl : '../../assets/map.png' }
    ]},
    {id:3,code:'chonbd', title : 'Đội bóng',imgUrl : '../../assets/doibong.png'},
    {id:4,code:'ttcn', title : 'Thông tin cá nhân',imgUrl : '../../assets/thongtincanhan.png' },
    {id:5,code:'dx', title : 'Đăng xuất',imgUrl : '../../assets/dangxuat.png' },
  ];
  listTeams : ITeam[] = [];
  firstTeam: ITeam ;
  secondTeam: ITeam ;
  thirdTeam: ITeam ;
  selectedMenu : number = 3;
  showSpinner: boolean = true;
  constructor(
    private accountServices: AccountService,
    private teamServices: TeamService,
    private router: Router ,
    private fb: FormBuilder,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.firstTeam = null;
    this.secondTeam = null;
    this.thirdTeam = null;
    this.accountServices.Teams = new BehaviorSubject<ITeam[]>([]);
    this.accountServices.Teams.subscribe(res => {
      if(res.length != 0){
        if(res.length == 1){
          this.firstTeam = res[0];
        }
        if(res.length == 2){
          this.firstTeam = res[0];
          this.secondTeam = res[1];
        }
        if(res.length == 3){
          this.firstTeam = res[0];
          this.secondTeam = res[1];
          this.thirdTeam = res[2];
        }
        this.showSpinner = false;
      }else{
        this.showSpinner = false;
      }
    });
    this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
  }
  test(){
    console.log(this.listTeams.length);  
  }

  viewTeam(team: ITeam){
    this.showSpinner = true;
    localStorage.removeItem(SystemConstants.CURRENT_TEAM);
    localStorage.setItem(SystemConstants.CURRENT_TEAM,team.id.toString());
    this.teamServices.getRole(team.id,localStorage.getItem(SystemConstants.CURRENT_USER)).subscribe(res =>{
        localStorage.removeItem(SystemConstants.MEMBER_ROLE);
        localStorage.setItem(SystemConstants.MEMBER_ROLE,res[0].role_id.toString());
        this.router.navigate([UrlConstants.TEAM_DETAILS + '/' + team.id]);  
    });
  }
  addTeam(){
    const dialogRef = this.dialog.open(DialogAddTeamRequest, {
      width: '80%',
      height: '90%',
      data: {message: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
      else{
        this.accountServices.getUsersTeams(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
    });
  }
}
interface marker {
	lat: number;
	lng: number;
  iconUrl?: String;
  name: String;
  teamId: number;
}
@Component({
  selector: 'dialog-add-team-messages',
  templateUrl: 'dialog-add-team-message.html',
  styleUrls: ['./dialog-add-team-message.scss']
})
export class DialogAddTeamRequest implements OnInit{
  imgName: string= "";
  teamName: string = "";
  teamDescription: string = "";
  teamCity: string = "";
  teamWard: string = "";
  showSpinner: boolean = false;
  imgUrl: SafeUrl = "../../../assets/unknown.jpg";
  uploadedImage: Blob;
  imagePreview: string;
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
  iconUrl : string = 'http://maps.google.com/mapfiles/kml/pal2/icon49.png';
  listWard :String[] = [];
  markers : marker[] = [];
  longitude = 106.658342;
  latitude = 10.860960;
  zoom = 13;
  listTeamsResult: ITeam[] = [];
  private team: ITeam = {};
  constructor(
    public dialogRef: MatDialogRef<DialogAddTeamRequest>,
    private ng2ImgMax: Ng2ImgMaxService,
    private teamServices: TeamService,
    private accountServices: AccountService,
    public sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: ITeam) {}
    locationChosen(event){
      this.latitude = event.coords.lat;
      this.longitude = event.coords.lng;
    }
    
  ngOnInit() {
    this.accountServices.getTeamsFromServer();
    this.accountServices.listTeams.subscribe(res => {
      if(res.length != 0){
        this.listTeamsResult = res;
        console.log(this.listTeamsResult);
        this.listTeamsResult.forEach(t => {
          this.markers.push({
            lat: t.latitude,
            lng: t.longitude,
            iconUrl: t.ImgUrl,
            name: t.Fullname,
            teamId: t.id
          });
        });
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  changeCity(val: number){
    (val == 28) ? (this.listWard = this.listWardData.find(x => x.id == 28).listWard) : 
                 (this.listWard = this.listWardData.find(x => x.id == 24).listWard);

    (val == 28) ? this.teamCity = "TP.Hồ Chí Minh" : this.teamCity = "Hà Nội" ;
 }
 changeWard(val: string){
   this.teamWard = val;
 }
 
  uploadFile(){
    this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(this.imagePreview);
  }
  getImagePreview(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    };
  }
  onFileSelected(event: any){
    this.imgName = '../../assets/'+ event.target.files[0].name;
    // this.info.ImgUrl = "../../assets/" + this.imgPlayer;
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image,150,150).subscribe(result => {
      this.getImagePreview(new File([result], result.name));
    },
      error =>{
        console.log("Khong resize duoc",error);
      }
    );
  }
  addTeam(){
    this.showSpinner = true;
    this.teamServices.addTeam(this.imgName,this.teamName,this.teamDescription,this.teamCity,this.teamWard,this.latitude,this.longitude,localStorage.getItem(SystemConstants.CURRENT_USER)).subscribe(res =>{
      if(res){
        this.dialogRef.close();
      }else{
        console.log("khong them duoc");
      }
    });
  }
}
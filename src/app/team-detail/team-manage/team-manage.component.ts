import { Component, OnInit, Inject } from '@angular/core';
import { IMenu } from 'src/app/interfaces/IMenu';
import { AccountService } from 'src/app/core/services/account.service';
import { Router } from '@angular/router';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { SystemConstants } from 'src/app/core/common/system.constants';
import { TeamService } from 'src/app/core/services/team.service';
import { ITeam } from 'src/app/interfaces/ITeam';
import { IMember } from 'src/app/interfaces/IMember';
import { IPosition } from 'src/app/interfaces/iposition';
import { PositionService } from 'src/app/core/services/position.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { IInvitation } from 'src/app/interfaces/iinvitation';

@Component({
  selector: 'app-team-manage',
  templateUrl: './team-manage.component.html',
  styleUrls: ['./team-manage.component.scss']
})
export class TeamManageComponent implements OnInit {

  listMenu : IMenu[] = [
    { id:1,code:'ttdb',title : 'Thông tin đội',imgUrl : '../../assets/timcauthu.png' },
    { id:2,code:'tlsd',title : 'Lịch sữ đấu',imgUrl : '../../assets/map.png' },
    { id:3,code:'tdh',title : 'Đội hình',imgUrl : '../../assets/doibong.png' },
    { id:4,code:'qld',title : 'Quản lý đội',imgUrl : '../../assets/thongtincanhan.png' },
    { id:5,code:'back',title : 'Quay lại',imgUrl : '../../assets/dangxuat.png' },
  ];
  page_title : string = "Quản lý đội";
  selectedMenu : number = 4;
  imgX: string = "../../../assets/x.png";
  listFriends: IPlayer[] = [];
  teamId: number = 0;
  listUserTeam: ITeam[] = [];
  teamMembers: IMember[] = [];
  positionData: IPosition[] = [];
  showListMemberSpinner: boolean = true;
  showListFriendSpinner: boolean = true;
  showListInvitationSpinner: boolean = true;
  listInvitations: IInvitation[] = [];
  countMember: number = 0;
  countInvitation: number = 0;
  team: any = {};
  showEditFullName: boolean = false;
  showEditCity: boolean = false;
  newName : string = "";
  loaded: boolean = false;
  constructor(
    private accountServices : AccountService,
    private teamServices: TeamService,
    private positionServices: PositionService,
    private toastr: ToastrManager,
    private router: Router,
    public dialog: MatDialog
    ) {
    }

  ngOnInit() {
    this.teamServices.Teams.subscribe(res =>{
      if(res.length==0){
        this.teamServices.getTeamById(localStorage.getItem(SystemConstants.CURRENT_TEAM));
      }else{
        this.team = res;
        this.newName = this.team.Fullname;
      }
    });
    this.positionServices.listPositions.subscribe(res =>{
      if(res.length == 0){
        this.positionServices.getPositionsFromServer();
      }else{
        this.positionData = res;
      }
    });
    // Lấy danh sách bạn
    this.accountServices.Friends.subscribe(data => {
      if(data.length != 0){
        this.listFriends = data;   
        this.teamServices.Invitations.subscribe(res => {
          if(res.length != 0){
            this.listInvitations = res;
            this.countInvitation = this.listInvitations.length;
            this.listInvitations.forEach(i => {
              i.user = this.listFriends.filter(u => u.id == i.user_id)[0];
            });
            this.listFriends.forEach(u => {
              this.listInvitations.forEach(i =>{
                if(i.user_id == u.id){
                  u.Invited = true;
                }
              });
            });
            this.teamServices.getTeamMembers(localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
              console.log(res);
              this.countMember = res.length;
              this.listFriends.forEach(u => {
                res.forEach(p =>{
                  if(p.id == u.id){
                    u.Invited = true;
                  }
                })
                if(!u.Invited){
                  u.Invited = false;
                } 
              });
            });
          }else if(res.length == 0){
            this.teamServices.getTeamMembers(localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
              console.log(res);
              this.countMember = res.length;
              this.listFriends.forEach(u => {
                res.forEach(p =>{
                  if(p.id == u.id){
                    u.Invited = true;
                  }
                })
                if(!u.Invited){
                  u.Invited = false;
                } 
              });
            });
            this.showListInvitationSpinner = false;
          }   
        });
      }else{
       // this.showListFriendSpinner = false;
      }
      });
      this.accountServices.getListFriend(localStorage.getItem(SystemConstants.CURRENT_USER)); 
    
     this.teamServices.Members.subscribe(res =>{
      if(res.length != 0){
      this.teamMembers = <IMember[]>res;
      this.teamServices.getTeamMembers(localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
        this.teamMembers.forEach(m =>{
          res.forEach(u => {
            if(m.user_id == u.id){
              m.user = u;
            }
          });
        });
        this.teamMembers.forEach(m =>{
          this.positionData.forEach(p =>{
            if(m.position_id == p.id){
              m.position = p;
            }
          });
          if(m.role_id == 2){
            m.imgRoleUrl ="../../../assets/team-manager.png";
          }else if(m.role_id == 3){
            m.imgRoleUrl ="../../../assets/team-admin.png";
          }else{
            m.imgRoleUrl ="../../../assets/team-member.png"
          }
        });
        this.showListMemberSpinner = false;
        this.showListFriendSpinner = false;
      });
      }       
    });
    this.teamServices.getTeamMembersDetails(localStorage.getItem(SystemConstants.CURRENT_TEAM)); 
  }
  deleteMember(member: IMember){
    const dialogRef = this.dialog.open(DialogDeleteMemberConfirm, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.showListMemberSpinner = true;
        this.teamServices.deleteMember(member.id).subscribe(res=> {
        if(res){
          this.showListMemberSpinner = false;
          this.toastr.successToastr('Xóa thành công', 'Thông báo',{
            position: 'top-right',
            animate: 'slideFromTop'
          });
            this.teamMembers = this.teamMembers.filter(m => m.id != member.id);
            this.countMember--;
          }else{
            this.toastr.errorToastr('Xóa thất bại', 'Lỗi',{
              position: 'top-right',
              animate: 'slideFromTop'
            });
          }
        })
      }
      else{
        console.log("Cancel delete");
      }
    });
  }
  invite(player: IPlayer){
    this.showListFriendSpinner = true;
    this.listFriends.forEach(p => {
      if(p.id == player.id){
        p.Invited = true;
      }
    });
    this.teamServices.addInvitation(player.id,localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
     if(res){ 
      res[0].user = player;
      this.listInvitations.unshift(res[0]);
      this.countInvitation++;
      this.accountServices.addTeamRequest(localStorage.getItem(SystemConstants.CURRENT_TEAM),player.id);
      this.toastr.successToastr('Đã gữi lời mời', 'Thông báo',{
        position: 'top-right',
        animate: 'slideFromTop'
      });
      this.showListFriendSpinner = false;
     }else{ 
      this.toastr.errorToastr('Gữi lời mời thất bại', 'Lỗi',{
        position: 'top-right',
        animate: 'slideFromTop'
      });
      this.showListFriendSpinner = false;
     }
    });
  }
  cancelInvited(invi: IInvitation){
    this.showListInvitationSpinner = true;
    this.teamServices.deleteTeamInvitedNotification(invi.user_id,localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
      if(res){
        this.teamServices.cancelInvited(invi.id).subscribe(res =>{
          if(res){  
            this.listInvitations = this.listInvitations.filter(i => i.id != invi.id);
            this.countInvitation--;
            this.listFriends.forEach(f => {
              if(f.id == invi.user_id){
                f.Invited = false;
              }
            });
            this.toastr.successToastr('Đã hủy lời mời', 'Thông báo',{
              position: 'top-right',
              animate: 'slideFromTop'
            });
            this.showListInvitationSpinner = false;
          }else{
            this.toastr.errorToastr('Hủy lời mời thất bại', 'Thông báo',{
            position: 'top-right',
            animate: 'slideFromTop'
          });
          this.showListInvitationSpinner = false;
          }
        });
      }
    });
  }
  test(){
    console.log(this.teamMembers);
  }
  editFullName(){
    this.showEditFullName = true;
  }
  cancelEditFullName(){
    this.showEditFullName = false;
  }
  editCity(){
    this.showEditCity = true;
  }
  cancelEditCity(){
    this.showEditCity = false;
  }
  changeName(){
    console.log(this.newName);
    this.teamServices.changeTeamName(this.newName,localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
      if(res){
        this.toastr.successToastr('Đỗi tên đội thành công', 'Thông báo',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.team.Fullname = this.newName;
        this.cancelEditFullName();
      }else{
        this.toastr.errorToastr('Đỗi tên đội thất bại', 'Thông báo',{
        position: 'top-right',
        animate: 'slideFromTop'
      });
      }
    });
  }
  changeCity(newCity: any){
    console.log(newCity);
    this.teamServices.changeTeamCity(newCity,localStorage.getItem(SystemConstants.CURRENT_TEAM)).subscribe(res =>{
      if(res){
        this.toastr.successToastr('Chỉnh sữa thành công', 'Thông báo',{
          position: 'top-right',
          animate: 'slideFromTop'
        });
        this.team.City = newCity;
        this.cancelEditCity();
      }else{
        this.toastr.errorToastr('Chỉnh sữa thất bại', 'Thông báo',{
        position: 'top-right',
        animate: 'slideFromTop'
      });
      }
    });
  }
}

@Component({
  selector: 'dialog-delete-member-confirm',
  templateUrl: 'dialog-delete-member-confirm.html',
})
export class DialogDeleteMemberConfirm {

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteMemberConfirm>,
    @Inject(MAT_DIALOG_DATA) public member: IMember) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

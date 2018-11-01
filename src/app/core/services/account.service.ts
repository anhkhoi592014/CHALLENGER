import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { SystemConstants } from '../common/system.constants';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';
import { map } from 'rxjs/operators';
import { IUserPosition } from 'src/app/interfaces/iuser-position';
import { INotification } from 'src/app/interfaces/INotification';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _users :BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);
  private _listUser :BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);
  private _powers :BehaviorSubject<IPower[]> = new BehaviorSubject<IPower[]>([]);
  private _teams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  private _listTeams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  private _positions :BehaviorSubject<IUserPosition[]> = new BehaviorSubject<IUserPosition[]>([]);
  private _notifications :BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]); 
  constructor(
    private http: HttpClient
  ) { }

  // Đăng kí behaviorSubject 
  get Users(){
    return this._users.asObservable();
  }
  get Powers(){
    return this._powers.asObservable();
  }
  get Teams(){
    return this._teams.asObservable();
  }
  get Positions(){
    return this._positions.asObservable();
  }

  get listUsers(){
    return this._listUser.asObservable();
  }
  get listTeams(){
    return this._listTeams.asObservable();
  }

  get Notifications(){
    return this._notifications.asObservable();
  }
  // Lấy data từ server
  getUsersFromServer(){
    this.http.get(SystemConstants.BASE_API + 'users')
    .subscribe(data => {
      //Truyền data tới behaviorSubject đã subcribe (Truyền data vào hàm subcribe)
      this._listUser.next(<IPlayer[]>data);
    })
  }
  getTeamsFromServer(){
    this.http.get(SystemConstants.BASE_API + 'teams')
    .subscribe(data => {
      //Truyền data tới behaviorSubject đã subcribe (Truyền data vào hàm subcribe)
      this._listTeams.next(<ITeam[]>data);
    })
  }
  getUserById(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id).subscribe(data => {
      this._users.next(<IPlayer[]>data);
    })
  }
  editProfile(info: any,id: any): Observable<Boolean>{
    return this.http.put(SystemConstants.BASE_API + 'users/edit/' + id,JSON.stringify(info),httpOptions)
    .pipe(
      map((res) =>{
          if(res){
            this._users.next(<IPlayer[]>res);
            return true;
          }
          return false;
        }
      )
    );
  }
  // Lấy danh sách vị trí
  getUserPositions(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/positions').subscribe(res =>{
      this._positions.next(<IUserPosition[]>res);
    });
  }


  // Lấy danh sách chỉ số cầu thủ
  getUserPowers(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/powers').subscribe(data =>{
      this._powers.next(<IPower[]>data);
    })
  }

  
  addUserPowers(idUser: any,idPosition: any){
    this.http.post(SystemConstants.BASE_API + 'user/'+ idUser +'/powers/add',
    JSON.stringify({idPosition}),httpOptions).subscribe(res =>{
      console.log("Added User Powers");
      this._powers.next(<IPower[]>res);
    });
  }
  // Lấy danh sách đội
  getUsersTeams(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/teams').subscribe(data => {
      this._teams.next(<ITeam[]>data);
    });
  }
  
  updatePositionNameToUser(user_id: any,position_id: any,type: string){
    this.getUserPositions(user_id);
    this.http.put(SystemConstants.BASE_API + 'user/' + user_id +'/position/update',JSON.stringify({position_id,type}),httpOptions)
    .subscribe(res => {
        this._users.next(<IPlayer[]>res);
    });
  }


  deleteUserEP(id: any){
    this.getUserPositions(id);
    this.http.delete(SystemConstants.BASE_API + 'user/' + id +'/position/delete').subscribe(res =>{
      this._users.next(<IPlayer[]>res);
    });
  }

  // Đổi mật khẩu
  changePassword(id: any,newPassword: string): Observable<boolean>{
    return this.http.put(SystemConstants.BASE_API + 'users/edit/password/' + id,JSON.stringify({newPassword}),httpOptions).
    pipe(
      map((res) => {
        // thay đỗi password thành công
        if(res){
          return true;
        }
        return false;
      }
      )
    )
  }

  // Cập nhập Danh sách chỉ số của cầu thủ
  updateUserPowers(id: any,data: IPower[]): Observable<boolean> {
    return this.http.put(SystemConstants.BASE_API + 'user/'+ id +'/powers/update',data,httpOptions).
    pipe(
      map((res) =>{
        if(res){
          return true;
        }
        return false;
      })
    );
  }
  
  //Lấy Danh Sách Team
  addUserMainPosition(position_id: number,user_id: any){
    this.http.post(SystemConstants.BASE_API + 'user/positions/mp/add',
    JSON.stringify({position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Added Main Position");
        this.updatePositionNameToUser(user_id,position_id,"MP");
      }
    });
  }

  // Sữa Vị Trí Chính
  updateUserMainPosition(id: number, position_id: number, user_id: any){
    this.http.put(SystemConstants.BASE_API + 'user/positions/mp/update',
    JSON.stringify({id,position_id,user_id}),httpOptions).subscribe(res => {
      if(res == 1){
        console.log("Updated Main Position");
        this.getUserPowers(user_id);
        this.updatePositionNameToUser(user_id,position_id,"MP");
      }
    });
  }

  // Thêm Vị Trí Phụ
  addUserExtraPosition(position_id: number,user_id: any){
    this.http.post(SystemConstants.BASE_API + 'user/positions/ep/add',
    JSON.stringify({position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Added Extra Position");
        this.addUserPowers(user_id,position_id);
        this.updatePositionNameToUser(user_id,position_id,"EP");
      }
    });
  }

  // Sữa Vị Trí Phụ
  updateUserExtraPosition(id: number, position_id: number, user_id: any){
    this.http.put(SystemConstants.BASE_API + 'user/positions/ep/update',
    JSON.stringify({id,position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Updated Extra Position !!!")
        this.getUserPowers(user_id);
        this.updatePositionNameToUser(user_id,position_id,"EP");
      }
    });
  }


  deleteUserExtraPosition(id: number){
    this.http.delete(SystemConstants.BASE_API + 'user/positions/ep/delete/' + id,httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Deleted Extra Position");
        this.getUserPowers(localStorage.getItem(SystemConstants.CURRENT_USER));
        this.deleteUserEP(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
    });
  }
  //Extra power 
  updateListPowers(user_id: any,id: any,position_id: any){
    this.http.put(SystemConstants.BASE_API + 'user/' + user_id +'/listPower/update',JSON.stringify({position_id,id}),httpOptions)
    .subscribe(() => {
      this.updateUserExtraPosition(id,position_id,user_id);
    });
  }
  deleteListPowers(id: any){
    this.http.delete(SystemConstants.BASE_API + 'user/listPower/delete/'+id,httpOptions)
    .subscribe(() => {
      this.deleteUserExtraPosition(id);
    });
  }

  //Main power
  updateListMainPowers(user_id: any,id: any,position_id: any){
    this.http.put(SystemConstants.BASE_API + 'user/' + user_id +'/listPower/update',JSON.stringify({position_id,id}),httpOptions)
    .subscribe(() => {
      this.updateUserMainPosition(id,position_id,user_id);
    });
  }

  getUserNotifications(id: any){
    this.http.get(SystemConstants.BASE_API + 'user/' + id + '/notifications').subscribe(data => {
      this._notifications.next(<INotification[]>data);
    });
  }
  addFriendRequest(from_id: any,to_id: any,message:string){
    this.http.post(SystemConstants.BASE_API + 'user/'+ to_id +'/friend-request/add',
    JSON.stringify({from_id,message}),httpOptions).subscribe(res =>{
      console.log(res);
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';
import { map } from 'rxjs/operators';
import { IUserPosition } from 'src/app/interfaces/iuser-position';

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
  private _powers :BehaviorSubject<IPower[]> = new BehaviorSubject<IPower[]>([]);
  private _teams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  private _positions :BehaviorSubject<IUserPosition[]> = new BehaviorSubject<IUserPosition[]>([]);
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
  // Lấy data từ server
  getUsersFromServer(){
    this.http.get(SystemConstants.BASE_API + 'users')
    .subscribe(data => {
      //Truyền data tới behaviorSubject đã subcribe (Truyền data vào hàm subcribe)
      this._users.next(<IPlayer[]>data);
    })
  }
  getTeamsFromServer(){
    this.http.get(SystemConstants.BASE_API + 'teams')
    .subscribe(data => {
      //Truyền data tới behaviorSubject đã subcribe (Truyền data vào hàm subcribe)
      this._teams.next(<ITeam[]>data);
    })
  }
  getUserById(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id).subscribe(data => {
      this._users.next(<IPlayer[]>data);
    })
  }
  editProfile(info: any,id: any): Observable<Boolean>{
    console.log(JSON.stringify(info));
    return this.http.put(SystemConstants.BASE_API + 'users/edit/' + id,JSON.stringify(info),httpOptions)
    .pipe(
      map((res) =>{
          if(res){
            console.log("Update Profile Success");
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

  // Lấy danh sách đội
  getUsersTeams(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/teams').subscribe(data => {
      this._teams.next(<ITeam[]>data);
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
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';
import { IPower } from 'src/app/interfaces/ipower';
import { ITeam } from 'src/app/interfaces/ITeam';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _users :BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);
  private _powers :BehaviorSubject<IPower[]> = new BehaviorSubject<IPower[]>([]);
  private _teams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
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
  getUserPowers(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/powers').subscribe(data =>{
      this._powers.next(<IPower[]>data);
    })
  }
  getUsersTeams(id: any){
    this.http.get(SystemConstants.BASE_API + 'users/' + id + '/teams').subscribe(data => {
      this._teams.next(<ITeam[]>data);
    });
  }
}

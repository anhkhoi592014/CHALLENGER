import { Injectable } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { ITeam } from 'src/app/interfaces/ITeam';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _users :BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);
  private _teams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  constructor(
    private http : HttpClient
  ) { }
  get Users(){
    return this._users.asObservable();
  }
  get Teams(){
    return this._teams.asObservable();
  }

  getListUserSend(id: any){
    this.http.get(SystemConstants.BASE_API + 'user/' + id + '/ListUserSendNotification').subscribe(data => {
      this._users.next(<IPlayer[]>data);
    });
  }

  getListTeamSend(id: any): Observable<ITeam[]>{
    return this.http.get<ITeam[]>(SystemConstants.BASE_API + 'team/' + id + '/ListTeamSendNotification').
    pipe(
      map((res) =>{
        if(res){
          return res;
        }else{
          console.log("error: cann't get list team sen notifications")
        }
      })
    );
  }

  
}

import { Injectable } from '@angular/core';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';

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
  constructor(
    private http : HttpClient
  ) { }
  get Users(){
    return this._users.asObservable();
  }

  getListUserSend(id: any){
    this.http.get(SystemConstants.BASE_API + 'user/' + id + '/ListUserSendNotification').subscribe(data => {
      this._users.next(<IPlayer[]>data);
    });
  }

  
}

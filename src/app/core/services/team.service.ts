import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ITeam } from 'src/app/interfaces/ITeam';
import { BehaviorSubject } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IMember } from 'src/app/interfaces/IMember';
import { IRole } from 'src/app/interfaces/irole';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class TeamService { 
  private _teams :BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  private _users :BehaviorSubject<IPlayer[]> = new BehaviorSubject<IPlayer[]>([]);
  private _members : BehaviorSubject<IMember[]> = new BehaviorSubject<IMember[]>([]);
 constructor(
    private http: HttpClient
    ) { }
  
  get Teams(){
    return this._teams.asObservable();
  }

  get Users(){
    return this._users.asObservable();
  }

  get Members(){
    return this._members.asObservable();
  }

  getTeamById(id: any){
    this.http.get(SystemConstants.BASE_API + 'team/' + id).subscribe(data => {
      this._teams.next(<ITeam[]>data);
    })
  }

  getTeamMembers(id: any){
    this.http.get(SystemConstants.BASE_API + 'team/' + id + '/members').subscribe(data => {
      this._users.next(<IPlayer[]>data);
    })
  }

  getTeamMembersDetails(id: any){
    this.http.get(SystemConstants.BASE_API + 'team/' + id + '/members/details').subscribe(data => {
      this._members.next(<IMember[]>data);
    });
  }
}

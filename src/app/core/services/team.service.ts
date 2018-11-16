import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ITeam } from 'src/app/interfaces/ITeam';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { IPlayer } from 'src/app/interfaces/IPlayer';
import { IMember } from 'src/app/interfaces/IMember';
import { IRole } from 'src/app/interfaces/irole';
import { map } from 'rxjs/operators';
import { IInvitation } from 'src/app/interfaces/iinvitation';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';

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
  private _invitations : BehaviorSubject<IInvitation[]> = new BehaviorSubject<IInvitation[]>([]);
 constructor(
    private http: HttpClient
    ) { }
  
  get Teams(){
    return this._teams.asObservable();
  }
  get Invitations(){
    return this._invitations.asObservable();
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

  getTeamMembers(id: any): Observable<IPlayer[]>{
   return this.http.get<IPlayer[]>(SystemConstants.BASE_API + 'team/' + id + '/members').pipe(
     map(res => {
        if(res){
          return res;
        }
     })
   )
  }
  changeTeamName(newName: string,id: any): Observable<any>{
    return this.http.put(SystemConstants.BASE_API + 'team/' + id + '/changeName',JSON.stringify({newName}),httpOptions).pipe(
      map(res => {
        console.log(res);
         if(res){
          console.log("3");
           return true;
         }
         return false;
      })
    )
  }
  changeTeamCity(newCity: string,id: any): Observable<any>{
    return this.http.put(SystemConstants.BASE_API + 'team/' + id + '/changeCity',JSON.stringify({newCity}),httpOptions).pipe(
      map(res => {
        console.log(res);
         if(res){
           return true;
         }
         return false;
      })
    )
  }
  getTeamMembersDetails(id: any){
    this.http.get(SystemConstants.BASE_API + 'team/' + id + '/members/details').subscribe(data => {
      this._members.next(<IMember[]>data);
    });
  }
  deleteMember(id: number): Observable<Boolean>{
    return this.http.delete<Boolean>(SystemConstants.BASE_API + 'members/delete/'+id,httpOptions).pipe(
      map(res =>{
        if(res){
          return res;
        }
      })
    )
  }
  getInvitations(id: any){
    this.http.get(SystemConstants.BASE_API + 'team/' + id + '/invitations').subscribe(data => {
      this._invitations.next(<IInvitation[]>data);
    });
  }
  addInvitation(userId: any,teamId:any): Observable<IInvitation[]>{
    return this.http.post<IInvitation[]>(SystemConstants.BASE_API + 'invitations/add',
    JSON.stringify({userId,teamId}),httpOptions).pipe(
      map(res =>{
        if(res){
          return res;
        }
      })  
    )
  }
  cancelInvited(id: number): Observable<Boolean>{
    return this.http.delete<Boolean>(SystemConstants.BASE_API + 'invitations/delete/'+id,httpOptions).pipe(
      map(res =>{
        if(res){
          return true;
        }
        return false;
      })
    )
  }
}

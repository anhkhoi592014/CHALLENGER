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
import { AccountService } from './account.service';
import { INotification } from 'src/app/interfaces/INotification';
import { IMatch } from 'src/app/interfaces/imatch';

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
  private _matches : BehaviorSubject<IMatch[]> = new BehaviorSubject<IMatch[]>([]);
 constructor(
    private http: HttpClient,
    private accountService: AccountService
    ) {

     }
  
  get Teams(){
    return this._teams.asObservable();
  }
  get Invitations(){
    return this._invitations.asObservable();
  }

  get Users(){
    return this._users.asObservable();
  }
  get Matches(){
    return this._matches.asObservable();
  }

  get Members(){
    return this._members.asObservable();
  }

  getTeamById(id: any): Observable<ITeam[]>{
    return this.http.get<ITeam[]>(SystemConstants.BASE_API + 'team/' + id).pipe(
      map(res => {
         if(res){
           return res;
         }
      })
    )
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
  addMatch(teamOne: any,teamSecond: any): Observable<boolean>{
    return this.http.post(SystemConstants.BASE_API + 'matches/add',JSON.stringify({teamOne,teamSecond}),httpOptions).pipe(
      map(res => {
        console.log(res);
         if(res){
           return true;
         }
         return false;
      })
    )
  }
  getTeamNotifications(id: any): Observable<INotification[]>{
    return this.http.get<INotification[]>(SystemConstants.BASE_API + 'team/' + id + '/notifications').pipe(
      map(res => {
         if(res){
           return res;
         }
      })
    )
   }
  getMatches(id: any): Observable<IMatch[]>{
    return this.http.get<IMatch[]>(SystemConstants.BASE_API + 'team/' + id + '/matches').pipe(
      map(res => {
         if(res){
           return res;
         }
      })
    )
  }
  getRole(idTeam: any,idUser: any): Observable<IMember>{
    return this.http.get(SystemConstants.BASE_API + 'team/' + idTeam + '/members/' + idUser +'/role').pipe(
      map(res => {
         if(res){
           return res;
         }
         console.log("fails");
      })
    )
  }
  addTeam(imgName: string,teamName: string,teamDescription:string,teamCity: string,teamWard: string,latitude: number,longitude: number,idUser: any): Observable<ITeam>{
    return this.http.post<ITeam>(SystemConstants.BASE_API + 'teams/add',
    JSON.stringify({imgName,teamName,teamDescription,teamWard,teamCity,latitude,longitude,idUser}),httpOptions).pipe(
      map(res =>{
        console.log(res);
        return res;
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

  addMember(idTeam: any,idUser: any,idNoti: any){
    return this.accountService.deleteNotification(idNoti).subscribe((res)=>{
      if(res){
        console.log("Delete notification success");
        this.accountService.getUserNotifications(idUser);
        this.http.post(SystemConstants.BASE_API + 'team/member/add',
        JSON.stringify({idTeam,idUser}),httpOptions).subscribe(res =>{
          return res;
        });
      }
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
  deleteTeamInvitedNotification(idUser,idTeam): Observable<boolean>{
    return this.http.delete(SystemConstants.BASE_API + 'user/'+idUser+'/notification/team/'+idTeam+'/delete',httpOptions).
      pipe(
        map((res) =>{
          if(res){
            return true;
          }
          return false;
        })
      );
  }
  addTeamChallengeRequest(teamId: any,formTeamId: any): Observable<Boolean>{
    return this.http.post(SystemConstants.BASE_API + 'team/notification/add',JSON.stringify({teamId,formTeamId}),httpOptions).pipe(
      map(res => {
        if(res){
          console.log(res);
          return true;
        }
        return false;
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
  leaveTeam(idUser: any,idTeam: any): Observable<Boolean>{
    return this.http.delete<Boolean>(SystemConstants.BASE_API + 'teams/'+ idTeam +'/delete/'+idUser,httpOptions).pipe(
      map(res =>{
        if(res){
          return true;
        }
        return false;
      })
    )
  }
  deleteTeam(idTeam: any): Observable<Boolean>{
    return this.http.delete<Boolean>(SystemConstants.BASE_API + 'teams/delete/' + idTeam,httpOptions).pipe(
      map(res =>{
        if(res){
          return true;
        }
        return false;
      })
    )
  }
}

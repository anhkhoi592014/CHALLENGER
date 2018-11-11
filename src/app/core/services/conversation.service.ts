import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConversation } from 'src/app/interfaces/iconversation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';
import { IMessage } from 'src/app/interfaces/imessage';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private _conversations :BehaviorSubject<IConversation[]> = new BehaviorSubject<IConversation[]>([]);
  private _messages :BehaviorSubject<IMessage[]> = new BehaviorSubject<IMessage[]>([]);
  constructor(
    private http: HttpClient
    ) { }
  get Conversations(){
    return this._conversations.asObservable();
  } 
  get Messages(){
    return this._messages.asObservable();
  } 

  getConversations(id: any){
    this.http.get(SystemConstants.BASE_API + 'user/' + id + '/conversations').subscribe(data =>{
      this._conversations.next(<IConversation[]>data);
    });
  }
  // getMessages(id: any){
  //   this.http.get(SystemConstants.BASE_API + 'conversations/' + id + '/messages').subscribe(data =>{
  //     //this._messages.next(<IMessage[]>data);
  //     // console.log(data);
  //   });
  // }
  getMessages(id: any): Observable<any>{
    return this.http.get<IMessage[]>(SystemConstants.BASE_API + 'conversations/' + id + '/messages',httpOptions).
    pipe(
      map((res) =>{
        if(res){
          return res;
        }
        return res;
      })
    );
  }
  addMessage(fromUserId: any,toUserId: any,conversationId: any,message: string): Observable<IMessage[]>{
    return this.http.post<IMessage[]>(SystemConstants.BASE_API + 'conversations/' + conversationId + '/messages/add',JSON.stringify({toUserId,fromUserId,message}),httpOptions).
    pipe(
      map((res) =>{
        if(res){
          return res;
        }
      })
    );
  }
}

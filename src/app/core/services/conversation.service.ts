import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IConversation } from 'src/app/interfaces/iconversation';
import { HttpClient } from '@angular/common/http';
import { SystemConstants } from '../common/system.constants';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private _conversations :BehaviorSubject<IConversation[]> = new BehaviorSubject<IConversation[]>([]);
  constructor(
    private http: HttpClient
    ) { }
  get Conversations(){
    return this._conversations.asObservable();
  } 

  getConversations(id: any){
    this.http.get(SystemConstants.BASE_API + 'user/' + id + '/conversations').subscribe(data =>{
      this._conversations.next(<IConversation[]>data);
    })
  }
}

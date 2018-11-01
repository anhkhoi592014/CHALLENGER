import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";
import { WebsocketService } from './websocket.service';
import { environment } from 'src/environments/environment';

export interface Message{
  name: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public message: Subject<Message>;

  get Message(){
    return this.message;
  }
  constructor(
    private wsService: WebsocketService
  ) { 
    // this.message = <Subject<Message>>this.wsService
    // .connect(environment.CHAT_URL)
    // .pipe(
    //   map((respone: MessageEvent): Message => {
    //     let data = JSON.parse(respone.data);
    //     return {
    //       name: data.name,
    //       message: data.message
    //     }
    //   })
    // )
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { AccountService } from './account.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _positions :BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);
  constructor(
    private accountService: AccountService,
    private http: HttpClient
    ) { }
    
  get Positions(){
    return this._positions.asObservable();
  }

  getPositionsFromServer(){
    this.http.get(SystemConstants.BASE_API + 'positions').subscribe(res => {
      this._positions.next(<Object[]>res);
    });
  }
  
  // Thêm Vị Trí Chính
  addUserMainPosition(position_id: number,user_id: any){
    this.http.post(SystemConstants.BASE_API + 'user/positions/mp/add',
    JSON.stringify({position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Added Main Position");
        this.accountService.updatePositionNameToUser(user_id,position_id,"MP");
      }
    });
  }

  // Sữa Vị Trí Chính
  updateUserMainPosition(id: number, position_id: number, user_id: any){
    this.http.put(SystemConstants.BASE_API + 'user/positions/mp/update',
    JSON.stringify({id,position_id,user_id}),httpOptions).subscribe(res => {
      if(res == 1){
        console.log("Updated Main Position");
        this.accountService.updatePositionNameToUser(user_id,position_id,"MP");
      }
    });
  }

  // Thêm Vị Trí Phụ
  addUserExtraPosition(position_id: number,user_id: any){
    this.http.post(SystemConstants.BASE_API + 'user/positions/ep/add',
    JSON.stringify({position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Added Extra Position");
        this.accountService.updatePositionNameToUser(user_id,position_id,"EP");
      }
    });
  }

  // Sữa Vị Trí Phụ
  updateUserExtraPosition(id: number, position_id: number, user_id: any){
    console.log(JSON.stringify({id,position_id,user_id}));
    this.http.put(SystemConstants.BASE_API + 'user/positions/ep/update',
    JSON.stringify({id,position_id,user_id}),httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Updated Extra Position !!!");
        this.accountService.updatePositionNameToUser(user_id,position_id,"EP");
      }
    });
  }


  deleteUserExtraPosition(id: number){
    this.http.delete(SystemConstants.BASE_API + 'user/positions/ep/delete/' + id,httpOptions).subscribe(res =>{
      if(res == 1){
        console.log("Deleted Extra Position");
        this.accountService.deleteUserEP(localStorage.getItem(SystemConstants.CURRENT_USER));
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SystemConstants } from '../common/system.constants';
import { AccountService } from './account.service';
import { IPosition } from 'src/app/interfaces/iposition';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _positions :BehaviorSubject<IPosition[]> = new BehaviorSubject<IPosition[]>([]);
  private _listPositions :BehaviorSubject<IPosition[]> = new BehaviorSubject<IPosition[]>([]);
  constructor(
    private http: HttpClient
    ) { }
    
  get Positions(){
    return this._positions.asObservable();
  }

  get listPositions(){
    return this._listPositions.asObservable();
  }
  getPosition(id: any){
    this.http.get(SystemConstants.BASE_API + 'positions/' + id).subscribe(res => {
      this._positions.next(<IPosition[]>res);
    });
  }

  getPositionsFromServer(){
    this.http.get(SystemConstants.BASE_API + 'positions').subscribe(res => {
      this._listPositions.next(<IPosition[]>res);
    });
  }
}

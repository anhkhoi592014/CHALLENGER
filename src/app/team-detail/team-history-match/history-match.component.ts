import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { trigger,state,style,animate,transition } from '@angular/animations';
import * as moment from 'moment';
import { IMatch } from 'src/app/interfaces/imatch';

@Component({
  selector: 'app-history-match',
  animations: [
    trigger('hideShow',[
      state('hide',style({ zIndex : '-1' })),
      state('show',style({ zIndex : '2' })),
      transition('hide => show',[
        animate('0.1s')
      ]),
      transition('show => hide',[
        animate('0.1s')
      ])
    ]),
    trigger('toggleDetail',[
      state('hide',style({height: '0px'})),
      state('show',style({minHeight : '350px'})),
      transition('hide=>show' ,[animate('300ms')]),
      transition('show=>hide' ,[animate('300ms')])
    ])
  ],
  templateUrl: './history-match.component.html',
  styleUrls: ['./history-match.component.scss'],
  
})
export class HistoryMatchComponent implements OnInit {
  @Input() match: IMatch;
  isOVShow:boolean = true;
  isNoteShow:boolean = false;
  DetailShow:boolean = false;
  timeFromNow: string = "";
  constructor() { }

  ngOnInit() {
    this.timeFromNow = moment(this.match.created_at).fromNow();
  }

  toggleNote(name:string){
    if(name == 'ov'){
      this.isOVShow = true;
      this.isNoteShow = false;
    }else{
      this.isNoteShow = true;
      this.isOVShow = false;
    }
  }
  toggleDetail(){
    this.DetailShow = !this.DetailShow;
  }
}

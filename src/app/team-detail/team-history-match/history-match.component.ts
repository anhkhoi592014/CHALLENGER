import { Component, OnInit } from '@angular/core';
import { IMenu } from '../../interfaces/IMenu';
import { trigger,state,style,animate,transition } from '@angular/animations';

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
 
  isOVShow:boolean = true;
  isNoteShow:boolean = false;
  DetailShow:boolean = false;
  constructor() { }

  ngOnInit() {
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

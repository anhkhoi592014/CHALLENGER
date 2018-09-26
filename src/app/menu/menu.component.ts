import { Component, OnInit, Input } from '@angular/core';
import { IMenu } from '../interfaces/IMenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() listMenu: IMenu[];
  constructor() { }

  ngOnInit() {
  }

}

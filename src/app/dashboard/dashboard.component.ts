import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  longitude = 106.699878;
  latitude = 10.821923;
  ngOnInit() {
  }
  locationChosen(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

}

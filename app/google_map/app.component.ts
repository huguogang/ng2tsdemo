import {Component, OnInit, Renderer} from 'angular2/core';
import {GoogleMap} from './google_map.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/google_map/app.component.html',
  styleUrls: ['app/google_map/app.component.css'],
  directives: [GoogleMap]
})
export class AppComponent{
  zoom: number = 8; // 20 is max
  center: google.maps.LatLng = new google.maps.LatLng(37.3275, -122.1419);
  
  onMapClick(e: google.maps.MouseEvent) {
    console.log("in app", arguments);
  }
}
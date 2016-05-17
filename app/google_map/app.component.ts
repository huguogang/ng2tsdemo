import {Component, FORM_DIRECTIVES, OnInit, Renderer} from 'angular2/core';
import {GoogleMap} from './google_map.component'

@Component({
  selector: 'my-app',
  templateUrl: 'app/google_map/app.component.html',
  styleUrls: ['app/google_map/app.component.css'],
  directives: [GoogleMap]
})
export class AppComponent {
  markers: google.maps.MarkerOptions[] = [];
  heatmapData: google.maps.LatLng[] = [];
  zoom: number = 8; // 20 is max
  center: google.maps.LatLng = new google.maps.LatLng(37.3275, -122.1419);
  clickAction: string;
  
  constructor() {
    this.clickAction = 'drawMarker';
  }

  onMapClick(position: google.maps.LatLng) {
    if(this.clickAction === 'drawMarker') {
      this.addMarker(position);
    }
    else if(this.clickAction === 'drawHeatmap') {
      this.addHeatmap(position);
    }
    else if(this.clickAction === 'setCenter') {
      this.setCenter(position);
    }
  }

  addMarker(position: google.maps.LatLng) {
    /*this.markers.push({
      position: position,
      animation: google.maps.Animation.DROP,
      label: 'A',
      title: 'Click me to delete.'
    });*/
    // this.markers.push() won't work. It won't trigger change event.
    this.markers = this.markers.concat([{
      position: position,
      animation: google.maps.Animation.DROP,
      label: 'A',
      title: 'Click me to delete.'
    }]);
  }

  setCenter(position: google.maps.LatLng) {
    this.center = position;
  }

  addHeatmap(point: google.maps.LatLng) {
    this.heatmapData = this.heatmapData.concat([point]);
  }
}
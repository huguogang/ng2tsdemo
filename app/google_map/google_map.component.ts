import {Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer
} from 'angular2/core';


/**
 * A component wrapper of Google Maps.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'app/google_map/google_map.component.html'
})
export class GoogleMap implements OnInit {
  @Input() center: google.maps.LatLng = new google.maps.LatLng(0, 0);
  @Input() zoom: number = 15;

  @Output() mapClick: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  
  map: google.maps.Map;

  constructor(private _renderer: Renderer) { }

  ngOnInit() {
    let targetElement: any = this._renderer.selectRootElement(".map");
    let me:GoogleMap = this;
    
    this.map = new google.maps.Map(targetElement, {
      center: this.center,
      zoom: this.zoom
    });

    this.map.addListener('click', function (e: google.maps.MouseEvent) {
      // Still have closure scope change problem. "this"" will resolve to map.
      me.mapClick.emit(e.latLng);
    })
  }
}

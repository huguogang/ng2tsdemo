import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
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
  @Input()
  set heatmapData(value: google.map.LatLng[]) {
    this._heatmapData = value;
    if(this._heatmap) {
      this._heatmap.setData(value);
    }
  }

  @Input()
  set center(value: google.maps.LatLng) {
    this._center = value;
    if (this.map) {
      this.map.setCenter(this._center);
    }
  }

  @Input()
  set zoom(value: number) {
    this._zoom = value;
    if (this.map) {
      this.map.setZoom(this._zoom);
    }
  }

  @Input()
  set markers(value: google.maps.MarkerOptions[]) {
    if (this._markers) {
      this._markers.forEach(marker => marker.setMap(null));
    }
    this._markers = [];
    value.forEach(option => {
      let marker: google.maps.Marker = new google.maps.Marker(option);
      marker.setMap(this.map);
      this._markers.push(marker);
    });
    this._ref.detectChanges()
  }

  @Output() mapClick: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();

  private _markers: google.maps.Marker[];

  private _heatmap: google.maps.visualization.HeatmapLayer;
  private _heatmapData: google.maps.LatLng[];

  private _zoom: number = 15;
  private _center: google.maps.LatLng = new google.maps.LatLng(0, 0);;

  map: google.maps.Map;

  constructor(
    private _renderer: Renderer,
    private _ref: ChangeDetectorRef,
    private _ngZone: NgZone) { }

  ngOnInit() {
    let targetElement: any = this._renderer.selectRootElement(".map");
    let me: GoogleMap = this;

    this.map = new google.maps.Map(targetElement, {
      center: this._center,
      zoom: this._zoom
    });

    /*
    this.map.addListener('click', function (e: google.maps.MouseEvent) {
      // Still have closure scope change problem. "this"" will resolve to map.
      me.mapClick.emit(e.latLng);
    });
    */

    /**
     * Two lessons learned here:
     *   1. "this" scope will change in event handler
     *   2. Maps event handler is ran out of the Angular zone (no change detection)
     * Solutions:
     *   1. Use fat arrow notation, then "this" is the class itself
     *   2. "NgZone.run" will run code block in Angular Zone, thus restore change detection
     */
    this.map.addListener('click',
      // Lamda to the rescue, it will automatically capture this 
      (e: google.maps.MouseEvent) => {
        // Run event handler in Angular Zone, so that change detection will work
        this._ngZone.run(() =>
          this.mapClick.emit(e.latLng));
    });

    this._heatmap = new google.maps.visualization.HeatmapLayer({
      map: this.map,
      radius: 20
    });
  }
}

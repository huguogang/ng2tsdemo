import {Component, OnInit, Renderer} from 'angular2/core';

@Component({
  selector: 'my-app',
  template: '<renderer-root></renderer-root>'
})
export class AppComponent implements OnInit {
  constructor(private _renderer: Renderer) { }

  ngOnInit() {
    let root: any = this._renderer.selectRootElement('renderer-root');
    this._renderer.setText(root, "Render demo.");
  }
}
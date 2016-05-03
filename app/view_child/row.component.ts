import {Component, forwardRef, Inject, Input} from 'angular2/core';

import {AppComponent} from "./app.component";

@Component({
  selector: '.my-row',
  templateUrl: 'app/view_child/row.component.html'
})
export class Row {
  @Input() car: any;
  checked: boolean = false;

  constructor(
    // NOTE: according to documentation, forwardRef breaks the circular
    // reference that is necessary for parent injection.
    @Inject(forwardRef(() => AppComponent))
    // This won't work.
    // EXCEPTION; Cannot resolve all parameters for 'Row'... 
    // @Inject(AppComponent) 
    private _parent: AppComponent) { }
    
    onCheckedChange():void {
      this._parent.updateChecked();
    }
}
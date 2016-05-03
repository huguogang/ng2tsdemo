import {Component} from 'angular2/core';

import {MultiSlotContent} from './multi_slot_content.component';

@Component({
  selector: 'my-app',
  template: `
  <multi-slot-content>
    <my-title>Angular 2 Content Demo</my-title>
    <content>The selectors defined in MultiSlotContent directive will find 
    the content element in this template, insert it into it's own template 
    section.</content>
    <footer>Footer: this feature was called transclusion in Angular 1.</footer>
  </multi-slot-content>`,
  directives: [MultiSlotContent]
})
export class AppComponent { }
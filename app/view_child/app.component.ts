import {Component, forwardRef, QueryList, ViewChildren} from 'angular2/core';

import {Row} from "./row.component";

@Component({
  selector: 'my-app',
  templateUrl: 'app/view_child/app.component.html',
  directives: [Row]
})
export class AppComponent {

  checked: boolean = false;
  @ViewChildren(Row) rows: QueryList<Row>;

  toggleAll(): void {
    this.checked = !this.checked;
    this.rows.forEach(row => row.checked = this.checked);
  }

  updateChecked(): void {
    let isChecked: boolean = true;
    this.rows.forEach(row => isChecked = isChecked && row.checked);
    this.checked = isChecked;
  }
  cars: any[] = [{
    "ID": 1,
    "Make": "Toyota",
    "Model": "Camry"
  }, {
      "ID": 2,
      "Make": "Dodge",
      "Model": "Grand Caravan"
    }, {
      "ID": 3,
      "Make": "Chevy",
      "Model": "Tahoe"
    }, {
      "ID": 4,
      "Make": "Tesla",
      "Model": "X"
    }];
}
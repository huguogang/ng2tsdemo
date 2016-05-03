import {Component, OnInit} from 'angular2/core';

import {Car, JsonDataService} from './json_data.service';

@Component({
  selector: 'my-app',
  templateUrl: 'app/json_service/app.component.html',
  providers: [JsonDataService]
})
export class AppComponent implements OnInit {
  // Will show up in UI through one-way binding
  cars: Car[];

  constructor(private _jsonDataService: JsonDataService) { }

  ngOnInit() {
    this._jsonDataService.getJsonData()
      .subscribe(cars => this.cars = cars);
  }
}
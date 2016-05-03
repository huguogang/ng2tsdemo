import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http'
// Without this import, will get error message:
//   EXCEPTION: TypeError: x.map is not a function in [null]
import 'rxjs/Rx'
import {Observable} from 'rxjs/Observable';

// Defines data shape of JSON data
export interface Car {
  ID: number,
  Make: string,
  Model: string 
}

@Injectable() // Makes this service available for injection.
// Service that communicates with remote server to get JSON data.
export class JsonDataService {
  car: Car[];
  
  constructor(private _http: Http) {}
  
  getJsonData(): Observable<Car[]> {
    return this._http.get("app/json_service/data.json")
      .map(response => response.json());
  }
}
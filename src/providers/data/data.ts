import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  apiUrl = 'http://www.omdbapi.com/';
  apiKey = 'd55be316';
  search = '';

  constructor(public http: HttpClient) {
    console.log('Hello DataProvider Provider');
  }

  getFilms(val) {
    this.search = val;
    return new Promise(resolve => {
	    this.http.get(this.apiUrl+'?apikey='+this.apiKey+'&s='+this.search).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }
}
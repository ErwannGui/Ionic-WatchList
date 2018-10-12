import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  films: string[];
  nbResult: number;
  error: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {

    this.nbResult = 0;
    this.error = false;
    this.films = [];

  }

  getFilms(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.dataProvider.getFilms(val)
      .then(data => {
        if ( data['Response'] ) {
          this.films = data['Search'];
          this.nbResult = data['totalResults'];
          //console.log(this.films);
        } else this.error = true;
      });
    } else return;
  }

  itemTapped(event, filmId) {
    this.navCtrl.push(ItemDetailsPage, {
      filmId: filmId
    });
  }
}

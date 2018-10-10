import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: Array<{}>;
  films: string[];
  nbResult: number;
  error: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {

    this.nbResult = 0;
    this.error = false;
    this.films = [];
    this.items = [];

  }

  getFilms(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() !== '') {
      this.dataProvider.getFilms(val)
      .then(data => {
        if ( data['Response'] ) {
          this.films = data['Search'];
          this.nbResult = data['totalResults'];
          //this.setItems();
          //console.log(this.films);
        } else this.error = true;
      });
    } else return;
  }

  setItems() {
    for(let i = 1; i <= this.nbResult; i++) {
      this.items[i] = this.films[i];
      //console.log(this.films[i]);
    }
  }

  itemTapped(event, film) {
    this.navCtrl.push(ItemDetailsPage, {
      film: film
    });
  }
}

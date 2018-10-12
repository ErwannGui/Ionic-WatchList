import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { DataProvider } from '../../providers/data/data';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {
  films: any;
  nbResult: number;
  error: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public apiProvider: ApiProvider,
    private storage: Storage) {

    this.nbResult = 0;
    this.error = false;
    this.films = [];
    this.getFavorites();

  }

  getFavorites() {
    this.apiProvider.getFavorites()
    .then(favorites => {
      console.log(favorites);
      this.storage.get('id').then(id => {
        console.log(id);
        for(let i = 0; i < Object.keys(favorites).length; i++) {
          console.log(favorites[i]);
          if (favorites[i].user == id) {
            this.dataProvider.getFilmById(favorites[i].film)
            .then(film => {
              this.films[i] = film;
              console.log(this.films);
            });
          }
        }
      });
    });
  }


  itemTapped(event, filmId) {
    this.navCtrl.push(ItemDetailsPage, {
      filmId: filmId
    });
  }
}

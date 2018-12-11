import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { ApiProvider, Comment } from '../../providers/api/api';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  comments: any;
  nbComments: number;
  commentForm: FormGroup;
  filmId: string;
  logged: boolean;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public apiProvider: ApiProvider,
  	public dataProvider: DataProvider,
  	public alertCtrl: AlertController,
  	private storage: Storage,
  	private formBuilder: FormBuilder) {
    // If we navigated to this page, we will have an item available as a nav param

    this.filmId = navParams.get('filmId');
    console.log(this.filmId);
    this.selectedItem = [];
    this.getData();
    this.nbComments = 0;
    this.comments = [];
    this.commentForm = this.formBuilder.group({commentContent: ['']});
    this.storage.get('logged').then( val => {
      this.logged = val;
    });
  	this.getComments(this.filmId);
  }

  getData() {
    this.dataProvider.getFilmById(this.filmId)
    .then(film => {
      this.selectedItem = film;
      console.log(this.selectedItem);
    });
  }

  getComments(filmId: string) {
    this.apiProvider.getComments()
    .then(data => {
  		let y = 0;
  		this.nbComments = Object.keys(data).length;
    	for(let i = 0; i < this.nbComments; i++) {
	  	  if (data[i].film == filmId) {
		  		this.comments[y] = data[i];
		  		y++;
			    //this.setItems();
			    //console.log(this.comments);
	      }
    	}
    });
  }

  deleteComment(comment: Comment) {
  	this.apiProvider.deleteCommentById(comment.id);
  	for( let i = 0; i < this.comments.length; i++) { 
  		console.log(this.comments[i].id+' - '+comment.id);
		   if ( this.comments[i].id == comment.id) {
		     this.comments.splice(i, 1);
		     console.log(this.comments);
		   } else console.log('Comment not found');
		}
  }

  createComment() {
  	let content = this.commentForm.controls['commentContent'].value;
  	let newComment: Comment = new Comment(this.nbComments+1, this.filmId, content);
  	console.log(newComment);
  	this.apiProvider.createComment(newComment);
  	//this.doRefresh();
  }

  doRefresh(refresher) {
    this.getComments(this.filmId);
    refresher.complete();
  }

  doConfirm(comment: Comment) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this comment ?',
      message: 'Do you agree to delete this comment from database ?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.deleteComment(comment);
          }
        }
      ]
    });
    confirm.present();
  }
}

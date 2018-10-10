import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Refresher } from '../../../src';

import { ApiProvider } from '../../providers/api/api';

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

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public apiProvider: ApiProvider,
  	public alertCtrl: AlertController,
  	private formBuilder: FormBuilder) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('film');
    this.nbComments = 0;
    this.comments = [];
    this.filmId = this.selectedItem.imdbID;
    this.commentForm = this.formBuilder.group({commentContent: ['']});

    this.getComments(this.filmId);
  }

  getComments(filmId: string) {
    this.apiProvider.getComments()
    .then(data => {
  		let y = 0;
  		this.nbComments = data.length;
    	for(let i = 0; i < data.length; i++) {
	  	  if (data[i].film == filmId) {
		  		this.comments[y] = data[i];
		  		y++;
			    //this.setItems();
			    //console.log(this.comments);
	      }
    	}
    });
  }

  deleteComment(commentId: number) {
  	this.apiProvider.deleteCommentById(commentId);
  }

  createComment() {
  	let content = this.commentForm.controls['commentContent'].value;
  	let newComment: Comment = {
  		"id": this.nbComments+1,
  		"film": this.filmId,
  		"content": content
  	};
  	console.log(newComment);
  	this.apiProvider.createComment(newComment);
  	//this.doRefresh();
  }

  doRefresh(refresher: Refresher) {

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
            this.deleteComment(comment.id);
          }
        }
      ]
    });
    confirm.present();
  }
}

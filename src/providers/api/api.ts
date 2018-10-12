import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
   id: number;
   firstname: string;
   lastname: string;
   email: string;
   password: string;
   constructor(id, firstname, lastname, email, password) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
   }
}

export class Comment {
   id: number;
   film: string;
   content: string;
   constructor(id, film, content) {
        this.id = id;
        this.film = film;
        this.content = content;
   }
}

export class Favorite {
   id: number;
   user: number;
   film: string;
   constructor(id, user, film) {
        this.id = id;
        this.user = user;
        this.film = film;
   }
}

@Injectable()
export class ApiProvider {

  apiUrl = 'http://192.168.1.95:3000';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  // User requests

  getUsers() {
    return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/users').subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  getUserById(userId: number) {
    return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/users/'+userId).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  createUser(user: User) {
    return new Promise(resolve => {
	    this.http.post(this.apiUrl+'/users', user).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  updateUser(user: User) {
    return new Promise(resolve => {
	    this.http.put(this.apiUrl+'/users/'+user.id, user).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  deleteUserById(userId: number) {
    return new Promise(resolve => {
	    this.http.delete(this.apiUrl+'/users/'+userId).subscribe( err => {
	      console.log(err);
	    });
  	});
  }

  // Commment requests

  getComments() {
    return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/comments').subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  createComment(comment: Comment) {
    return new Promise(resolve => {
	    this.http.post(this.apiUrl+'/comments', comment).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  updateComment(comment: Comment) {
    return new Promise(resolve => {
	    this.http.put(this.apiUrl+'/comments/'+comment.id, comment).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  deleteCommentById(commentId: number) {
    return new Promise(resolve => {
	    this.http.delete(this.apiUrl+'/comments/'+commentId).subscribe( err => {
	      console.log(err);
	    });
  	});
  }

  // Favorite requests

  getFavorites() {
    return new Promise(resolve => {
	    this.http.get(this.apiUrl+'/favorites').subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  createFavorite(favorite: Favorite) {
    return new Promise(resolve => {
	    this.http.post(this.apiUrl+'/favorites', favorite).subscribe(data => {
	      resolve(data);
	      //console.log(data);
	    }, err => {
	      console.log(err);
	    });
  	});
  }

  deleteFavoriteById(favoriteId: number) {
    return new Promise(resolve => {
	    this.http.delete(this.apiUrl+'/favorites/'+favoriteId).subscribe( err => {
	      console.log(err);
	    });
  	});
  }

}

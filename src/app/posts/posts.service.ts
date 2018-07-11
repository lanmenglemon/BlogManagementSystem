import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  $authObservable : Subject<any> = new Subject();

  constructor(private _httpClient : HttpClient, private _router : Router) { }

  getPosts() {
    return this._httpClient.get('http://localhost:3000/getPosts');
  }

  createPost(postDetails : any) {
    this._httpClient.post('http://localhost:3000/createPost', postDetails).subscribe((data) => {
      console.log(data);
      this._router.navigate(['/posts']);
    })
  }

  getComments(postId : string) {
    return this._httpClient.get('http://localhost:3000/getComments/' + postId);
  }

  addComment(commentDetails : any) {
    return this._httpClient.post('http://localhost:3000/addComment', commentDetails);
  }

  addLike(postId : string) {
    return this._httpClient.get('http://localhost:3000/like/' + postId);
  }

  countLike(postId : string) {
    return this._httpClient.get('http://localhost:3000/countLike/' + postId);
  }

  editPost(editDetails : any) {
    this._httpClient.post('http://localhost:3000/editPost', editDetails).subscribe((data) => {
      this.$authObservable.next(true);
      this._router.navigate(['/posts']);
    });
  }

  deletePost(postId : string) {
    return this._httpClient.get('http://localhost:3000/deletePost/' + postId).subscribe((data) => {
      this.$authObservable.next(true);
    });
  }
}

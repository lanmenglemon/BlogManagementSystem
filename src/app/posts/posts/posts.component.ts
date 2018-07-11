import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts : any = [];
  pageTitle: string = "Post - List";

  constructor(private _postsService : PostsService, private _router: Router) { }

  ngOnInit() {
    this._postsService.getPosts().subscribe((data) => {
      this.posts = data;
    });
    this._postsService.$authObservable.subscribe((data) =>{
      this._postsService.getPosts().subscribe((data) => {
        this.posts = data;
      });
    })
  }


}

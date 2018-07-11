import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  @Input() id : string;
  comments : any = [];
  showHideComments : boolean = false;
  isLiked : boolean;
  likeCount : number;
  likedUsers : any = [];
  showHideEdit : boolean = false;

  constructor(private _postsService : PostsService, private _router : Router) { }

  ngOnInit() {
    this._postsService.countLike(this.id).subscribe((data : any) => {
      if (data.length == 0) {
        this.likeCount = 0;
      } else {
        this.isLiked = true;
        this.likeCount = data[0].count;
        this.likedUsers = data[0].users;
      }
    })
  }

  showComment() {
    this._postsService.getComments(this.id).subscribe((data) => {
      this.comments = data;
      this.showHideComments = !this.showHideComments;
    });
  }

  like() {
    this._postsService.addLike(this.id).subscribe((data : any) => {
      console.log(data);
      this.isLiked = !this.isLiked;
      this.likeCount = data[0].count;
      this.likedUsers = data[0].users;
    })
  }

  showEdit() {
    this.showHideEdit = !this.showHideEdit;
    if (!this.showHideEdit) {
      this._router.navigate(['/posts']);
    }
  }

  delete() {
    this._postsService.deletePost(this.id);
  }
}

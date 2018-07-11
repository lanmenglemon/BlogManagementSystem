import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../posts.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  providers: [PostsService]
})
export class CommentsComponent implements OnInit {

  @Input() commArray : any;
  @Input() postId : string;
  showHideAddComment : boolean = false;

  constructor(private _postsService : PostsService) { }

  ngOnInit() {

  }

  addComment() {
    this.showHideAddComment = !this.showHideAddComment;
  }

  commentFnParent(data : string) {
    this._postsService.getComments(this.postId).subscribe((data) => {
      this.commArray = data;
    });
  }
}

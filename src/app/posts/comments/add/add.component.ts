import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../posts.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [PostsService]
})
export class AddComponent implements OnInit {

  @Input() postId : string;
  @Output() commentToparent: EventEmitter<string> = new EventEmitter();
  commentForm : FormGroup;

  constructor(private _postsService : PostsService, private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.commentForm = this._formBuilder.group({
      postId: this.postId,
      content: ['', Validators.required]
    })
  }

  submit() {
    this._postsService.addComment(this.commentForm.value).subscribe((data) => {
      this.commentToparent.emit(this.commentForm.value);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PostsService]
})
export class CreateComponent implements OnInit {

  postForm : FormGroup;

  constructor(private _formBuilder : FormBuilder, private _postService : PostsService) { }

  ngOnInit() {
    this.postForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  createPost() {
    this._postService.createPost(this.postForm.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  editForm : FormGroup;
  
  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
    private _formBuilder: FormBuilder, private _postService : PostsService) { }
    
    ngOnInit() {
      this.editForm = this._formBuilder.group({
        postId: this._activatedRoute.snapshot.queryParams.postId,
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
    
    editPost() {
      this._postService.editPost(this.editForm.value);
    }
    
  }
  
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SubredditResponse} from '../../shared/subreddit-response';
import {CreatePostPayload} from './create-post.payload';
import {Router} from '@angular/router';
import {PostService} from '../../shared/post.service';
import {SubredditService} from '../../shared/subreddit.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditResponse>;

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    };
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.subredditService.getAllSubreddits().subscribe(data => {
      console.log('initialising subreddits dropdown options and fetching subreddits');
      this.subreddits = data;
    }, error => {
      console.log('error in fetching subreddits for dropdown');
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    this.postService.createPost(this.postPayload).subscribe(data => {
      console.log('post created successfully');
      this.router.navigateByUrl('/');
    }, error => {
      console.log('Error in creating post');
      throwError(error);
    });
  }

  discardPost() {
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }
}

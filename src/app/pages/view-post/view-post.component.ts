import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../shared/post-model';
import {PostService} from '../../shared/post.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {throwError} from 'rxjs';
import {CommentService} from '../../shared/comment.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommentPayload} from '../../shared/comment-payload';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private commentService: CommentService,
              private activatedRouter: ActivatedRoute, private router: Router) {
    this.postId = this.activatedRouter.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      console.log('Fetched post');
      this.post = data;
    }, error => {
      console.log('Could not fetch post by id' + this.postId);
      throwError(error);
    });
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      console.log('Comment posted successfully');
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      console.log('Could not post comment');
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      console.log('getting all comments for postId' + this.postId);
      this.comments = data;
    }, error => {
      console.log('could not get comments for post id=' + this.postId);
      throwError(error);
    });
  }
}

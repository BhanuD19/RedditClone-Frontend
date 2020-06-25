import { Component, OnInit } from '@angular/core';
import {PostModel} from '../../shared/post-model';
import {PostService} from '../../shared/post.service';
import {throwError} from 'rxjs';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts: Array<PostModel> = [];

  constructor(private postService: PostService, private authService: AuthService) {
    this.postService.getAllPosts().subscribe(data => {
      if (data === null) {
        console.log('No posts returned to show');
      } else {
        this.posts = data;
    }}, error => {
      console.log('could not retrieve posts');
      throwError(error);
    });
  }
}

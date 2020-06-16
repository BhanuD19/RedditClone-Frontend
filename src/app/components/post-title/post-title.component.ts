import {Component, Input, OnInit} from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import {PostService} from '../../shared/post.service';
import {PostModel} from '../../shared/post-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.scss']
})
export class PostTitleComponent implements OnInit {
  // @ts-ignore
  faComments: faComments;
  @Input() posts: PostModel[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}

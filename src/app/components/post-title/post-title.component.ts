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
export class PostTitleComponent {
  // @ts-ignore
  faComments: faComments;
  @Input() posts: PostModel[];

  constructor(private router: Router) { }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}

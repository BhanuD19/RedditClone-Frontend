import {Component, Input, OnInit} from '@angular/core';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import {PostModel} from '../../shared/post-model';
import {VoteService} from '../../shared/vote.service';
import {AuthService} from '../../auth/shared/auth.service';
import {PostService} from '../../shared/post.service';
import {ToastrService} from 'ngx-toastr';
import {VotePayload} from '../../shared/vote-payload';
import {VoteType} from '../../shared/vote-type';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit {

  @Input() post: PostModel;
  votePayload: VotePayload;
  // @ts-ignore
  faArrowUp: faArrowUp;
  // @ts-ignore
  faArrowDown: faArrowDown;


  constructor(private voteService: VoteService,
              private authService: AuthService,
              private postService: PostService,
              private toastr: ToastrService) {
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
  }

  ngOnInit(): void {
    this.updateVoteDetails();
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }
}

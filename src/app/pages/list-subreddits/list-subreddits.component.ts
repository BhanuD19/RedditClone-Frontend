import { Component, OnInit } from '@angular/core';
import {SubredditResponse} from '../../shared/subreddit-response';
import {SubredditService} from '../../shared/subreddit.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.scss']
})
export class ListSubredditsComponent implements OnInit {

  subreddits: Array<SubredditResponse>;
  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
    }, error => {
      console.log('Error in retreiving all subreddits');
      throwError(error);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SubredditResponse} from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditResponse>> {
    return this.http.get<Array<SubredditResponse>>('http://localhost:8080/api/subreddit');
  }

  createSubreddit(subredditModel: SubredditResponse): Observable<SubredditResponse> {
    return this.http.post<SubredditResponse>('http://localhost:8080/api/subreddit', subredditModel);
  }
}

import {VoteType} from './vote-type';

export class PostModel {
  id: number;
  postName: string;
  url: string;
  description: string;
  voteCount: number;
  username: string;
  subredditName: string;
  commentCount: number;
  duration: string;
  downVote: VoteType;
  upVote: VoteType;
}

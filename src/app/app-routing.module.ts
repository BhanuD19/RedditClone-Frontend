import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {CreatePostComponent} from './pages/create-post/create-post.component';
import {CreateSubredditComponent} from './pages/create-subreddit/create-subreddit.component';
import {ListSubredditsComponent} from './pages/list-subreddits/list-subreddits.component';
import {ViewPostComponent} from './pages/view-post/view-post.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-subreddit',
    component: CreateSubredditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list-subreddits',
    component: ListSubredditsComponent
  },
  {
    path: 'view-post/:id',
    component: ViewPostComponent
  },
  {
    path: 'user-profile/:name',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

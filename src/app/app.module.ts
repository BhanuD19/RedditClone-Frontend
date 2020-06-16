import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { HomeComponent } from './pages/home/home.component';
import {TokenInterceptor} from './token-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostTitleComponent } from './components/post-title/post-title.component';
import { VoteButtonComponent } from './components/vote-button/vote-button.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SubredditSideBarComponent } from './components/subreddit-side-bar/subreddit-side-bar.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { CreateSubredditComponent } from './pages/create-subreddit/create-subreddit.component';
import { ListSubredditsComponent } from './pages/list-subreddits/list-subreddits.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { GuidlinesComponent } from './components/guidlines/guidlines.component';
import {NgbDropdown, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTitleComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubredditSideBarComponent,
    CreatePostComponent,
    CreateSubredditComponent,
    ListSubredditsComponent,
    ViewPostComponent,
    GuidlinesComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbDropdownModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

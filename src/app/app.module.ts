import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HomeComponent } from './auth/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateComponent } from './posts/create/create.component';
import { DetailsComponent } from './posts/details/details.component';
import { NavigationComponent } from './auth/navigation/navigation.component';

import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { AuthGuard } from './auth/auth.guard';
import { OptionsComponent } from './posts/options/options.component';
import { CommentsComponent } from './posts/comments/comments/comments.component';
import { AddComponent } from './posts/comments/add/add.component';
import { EditComponent } from './posts/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CreateComponent,
    DetailsComponent,
    NavigationComponent,
    OptionsComponent,
    CommentsComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "posts", component: PostsComponent, canActivate: [AuthGuard],
        children: [
          {path:"edit", component: EditComponent, canActivate: [AuthGuard]}
        ]
      },
      {path: "signup", component: SignupComponent},
      {path: "login", component: LoginComponent},
      {path: "home", component: HomeComponent, canActivate: [AuthGuard]},
      {path: "create", component: CreateComponent, canActivate: [AuthGuard]},
      {path:"", redirectTo: "home", pathMatch: "full"},
      {path: "**", redirectTo: "home"}
    ], {useHash:true})
  ],
  providers: [AuthService, CookieService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

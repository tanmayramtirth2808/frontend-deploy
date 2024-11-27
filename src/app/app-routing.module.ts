import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BooksComponent } from './books/books.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfilePictureComponent } from './update-profile-picture/update-profile-picture.component';
import { AuthGuard } from './auth.guard';
import { NewAddBookComponent } from './new-add-book/new-add-book.component';
import { ChartComponent } from './chart/chart.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'add-book', component: AddBookComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'new-add-book', component: NewAddBookComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'view-book/:id', component: ViewBookComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'update-book/:id', component: UpdateBookComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'reviews', component: ReviewsComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'view-reviews/:id', component: ViewReviewsComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'add-review/:id', component: AddReviewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'update-review/:id', component: UpdateReviewComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-profile-picture', component: UpdateProfilePictureComponent },
  { path: 'charts', component: ChartComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'graph', component: Graph2Component, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'graphs', component: Graph3Component, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

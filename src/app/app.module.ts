import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BooksComponent } from './books/books.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AuthInterceptor } from './auth.interceptor';
import { AddBookComponent } from './add-book/add-book.component';
import { ViewBookComponent } from './view-book/view-book.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { ViewReviewsComponent } from './view-reviews/view-reviews.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { UpdateReviewComponent } from './update-review/update-review.component';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateProfilePictureComponent } from './update-profile-picture/update-profile-picture.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NewAddBookComponent } from './new-add-book/new-add-book.component';
import { ChartComponent } from './chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { EncryptionInterceptor } from './encryption.interceptor';
import { DemoComponent } from './demo/demo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    BooksComponent,
    ReviewsComponent,
    AddBookComponent,
    ViewBookComponent,
    UpdateBookComponent,
    ViewReviewsComponent,
    AddReviewComponent,
    UpdateReviewComponent,
    HeaderComponent,
    ChangePasswordComponent,
    UpdateProfilePictureComponent,
    NewAddBookComponent,
    ChartComponent,
    Graph2Component,
    Graph3Component,
    DemoComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    })  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
     },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EncryptionInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ProductDetailComponent} from './catalog/product-detail/product-detail.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CatalogService} from '../service/catalog.service';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'catalog', component: CatalogComponent },
  // { path: 'books/new', component: BookFormComponent },
  { path: 'catalog/product-detail/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CatalogComponent,
    ProductDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [CatalogService],
  bootstrap: [AppComponent]
})
export class AppModule { }

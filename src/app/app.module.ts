import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogDetailsComponent } from './dialog-details/dialog-details.component';

import { FormsComponent } from './forms/forms.component';

import {
  NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbSpinnerModule,
  NbInputModule,
  NbCardModule,
  NbBadgeModule,
  NbDialogModule,
  NbIconModule,
  NbFormFieldModule,
  NbContextMenuModule,
  NbMenuModule,
  NbAccordionModule,
  NbAlertModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogBuscaComponent } from './dialog-busca/dialog-busca.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { DialogBorrowComponent } from './dialog-borrow/dialog-borrow.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    DialogDetailsComponent,
    DialogDeleteComponent,
    FormsComponent,
    DialogBuscaComponent,
    DialogEditComponent,
    DialogBorrowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbButtonModule,
    NbSpinnerModule,
    NbInputModule,
    NbCardModule,
    NbBadgeModule,
    NbDialogModule.forRoot({ autoFocus: false }),
    NbIconModule,
    NbFormFieldModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbAccordionModule,
    NbAlertModule,
    NbTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

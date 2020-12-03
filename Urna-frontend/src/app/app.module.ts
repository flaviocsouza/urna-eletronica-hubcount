import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CandidatesViewComponent } from './Candidates/candidates-view/candidates-view.component';

import { HeaderComponent } from './Layout/header/header.component';
import { ResultsViewComponent } from './Results/results-view/results-view.component';
import { FormCandidatesComponent } from './Candidates/form-candidates/form-candidates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoteViewComponent } from './Votes/vote-view/vote-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatesViewComponent,
    HeaderComponent,
    ResultsViewComponent,
    FormCandidatesComponent,
    VoteViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { AddFeedbackComponent } from './components/add-feedback/add-feedback.component';



@NgModule({
  declarations: [
    FeedbackComponent,
    AddFeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    SharedModule
  ]
})
export class FeedbackModule { }

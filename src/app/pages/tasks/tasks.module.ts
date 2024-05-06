import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './task-routing.module';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { TaskComponent } from './components/task/task.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CommentsComponent } from './components/comments/comments.component';



@NgModule({
  declarations: [
    TaskComponent,
    AddTaskComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    SharedModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class TasksModule { }

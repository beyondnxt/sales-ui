import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/core/common.service';
import { TasksService } from 'src/app/providers/tasks/tasks.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private taskService: TasksService, private service: CommonService, public dialogRef: MatDialogRef<CommentsComponent>) { }
  isAddingFeedback: any;
  dataArray: any;
  // data: any = {
  //   "data": [
  //     {
  //       "id": 42,
  //       "taskType": "Lead",
  //       "customerId": 1,
  //       "customerName": "test",
  //       "assignTo": 9,
  //       "assignToName": "test",
  //       "description": "test description",
  //       "status": "Assigned",
  //       "feedBack": [{
  //         "createdBy": "Binu",
  //         "createdDate": "2024-05-04T15:34:45.000Z",
  //         "feedback": "Test"
  //       },
  //       {
  //         "createdBy": "Binu1",
  //         "createdDate": "2024-05-04T15:34:45.000Z",
  //         "feedback": "Test1"
  //       }
  //       ],
  //       "location": "undefined,undefined",
  //       "followUpDate": "2024-05-30T18:30:00.000Z",
  //       "createdOn": "2024-05-04T15:34:45.000Z",
  //       "createdBy": {
  //         "userId": "2",
  //         "userName": "jisha"
  //       },
  //       "userName": "jisha"
  //     }
  //   ],
  //   "fetchedCount": 9,
  //   "total": 14
  // }

  ngOnInit() {
    if (this.data.feedBack) {
      this.dataArray = this.data.feedBack;
    } else {
      this.dataArray = {};
    }

  }

  addFeedBack() {
    this.isAddingFeedback = !this.isAddingFeedback;
  }
  saveFeedback(feedback: any) {
    if (Object.keys(this.dataArray).length === 0) {
      this.dataArray = {
        "feedBack": [{
          feedback: feedback,
          createdDate: new Date(),
          createdBy: localStorage.getItem('user_id'),
          createdByName:localStorage.getItem('user_name')
        }]
      };
    } else {
      this.dataArray.push({ feedback, createdDate: new Date(), createdBy: localStorage.getItem('user_id'),createdByName:localStorage.getItem('user_name') });
      this.dataArray = { feedBack: this.dataArray };
    }
    this.isAddingFeedback = false;
    this.taskService.saveFeedBack(this.data.id, this.dataArray).subscribe({
      next: (res) => {
        this.service.showSnackbar("Feedback Added Successfully");
        this.dialogRef.close(res);
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

}

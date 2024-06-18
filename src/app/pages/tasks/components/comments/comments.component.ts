import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/providers/core/common.service';
import { TasksService } from 'src/app/providers/tasks/tasks.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  taskDetails: FormGroup;
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('feedbackTextarea') feedbackTextarea!: ElementRef;
  currentDate: Date = new Date();
  isAddingFeedback: boolean = false;
  dataArray: any = { feedBack: [] };

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, private taskService: TasksService, private service: CommonService, public dialogRef: MatDialogRef<CommentsComponent>) {
    this.taskDetails = this.fb.group({
      followUpDate: [this.currentDate, Validators.required],
      feedBack: ['', Validators.required]
    });
    if (this.data) {
      this.dataArray = this.data.feedBack;
    }
  }

  // ngOnInit() {
  //   if (this.data.feedBack) {
  //     this.dataArray = this.data.feedBack;
  //   } else {
  //     this.dataArray = [];
  //   }

  // }

  addFeedBack() {
    this.isAddingFeedback = !this.isAddingFeedback;
  }
  saveFeedback() {

    const feedback = this.feedbackTextarea.nativeElement.value;
    const followUpDate = this.fromDateInput.nativeElement.value;

    if (!feedback) {
      this.service.showSnackbar("Feedback or created date is missing.");
      return; // Exit the function early if any required data is missing
    }

      if (Object.keys(this.dataArray).length === 0) {
        console.log('85-------');
        this.dataArray = {
          feedBack: [{
            feedback: feedback,
            createdDate: new Date(),
            createdBy: localStorage.getItem('user_id'),
            createdByName: localStorage.getItem('user_name')
          }]
        };
      } else {
        this.dataArray.push({ feedback, createdDate: new Date(), createdBy: localStorage.getItem('user_id'), createdByName: localStorage.getItem('user_name') });
        this.dataArray = { feedBack: this.dataArray };
      }
      // this.updateFeedback(followUpDate);
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

  updateFeedback(followUpDate: any) {

    console.log('rawvalues-------', this.taskDetails.getRawValue());
    const id = this.data.id;
    this.taskService.updateFeedback(id, this.taskDetails.getRawValue()).subscribe({
      next: (res) => {
        return true;
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => { },
    });
  }

}

import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Activity } from 'src/app/model/Activity';
import { ActivityService } from 'src/app/service/ActivityService';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  @ViewChild('myForm', { static: false }) myForm!: NgForm;

  newActivity!: Activity;

  constructor(public service: ActivityService, private datePipe: DatePipe, public dialogRef: MatDialogRef<FormsComponent>) { }

  ngOnInit(): void {
    this.service.getEmps();
  }

  // create() {
  //   this.activity.estdate = this.formatDate(this.tempEst);
  //   this.activity.actdate = this.formatDate(this.tempAct);
  //   console.log(this.activity)
  //   this.service.addPost(this.activity).then(
  //     resolve => {
  //   // if the method below being called using async way, then the table desc wont be updated accordingly after data added
  //   alert("Activity Addded successfully.");
  // });
  // this.onClose();
  // }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close({flag: true});
  }

  onSubmit() {
    if (this.service.form.valid) {
        let formData = Object.assign({});
        formData = Object.assign(formData, this.service.form.value);
        formData.estDate = this.formatDate(formData.estDate);
        formData.actDate = this.formatDate(formData.actDate);
        formData.actDate = this.checkActDate(formData.actDate);
        this.newActivity = new Activity(formData.activityid, formData.activityname, formData.estDate, formData.actDate, formData.comment, formData.status);      
        console.log(this.newActivity);
        if (!this.service.form.get('activityid')!.value) {
        this.addNew(this.newActivity);
      }

      else{
        this.updateData(this.newActivity);
      }

        this.service.form.reset();
        this.service.initializeFormGroup();
        this.onClose();

    }
  }

  addNew(activity: Activity){
    this.service.addPost(activity).then(
      resolve => {
        // if the method below being called using async way, then the table desc wont be updated accordingly after data added
        alert("Activity Addded successfully.");
      });
  }

  updateData(activity: Activity){
    this.service.updatePut(activity,activity.activityid).then(
      resolve => {
        // if the method below being called using async way, then the table desc wont be updated accordingly after data added
        alert("Activity Updated successfully.");
      });
  }

  checkActDate(date: any){
    if(date == "NaN-NaN-NaN")
    {
      return date = this.service.form.controls['actDate'].setValue(null);
    }
    else{
      return date = date;
    }
  }

}

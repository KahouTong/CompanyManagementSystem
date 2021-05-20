import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountProfile } from 'src/app/model/AccountProfile';
import { AccountService } from 'src/app/service/AccountService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account = new AccountProfile();

  constructor(public service: AccountService, public dialogRef: MatDialogRef<ProfileComponent>) { }

  ngOnInit(): void {
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.service.form.valid) {
        let formData = Object.assign({});
        formData = Object.assign(formData, this.service.form.value);
        this.account.employeeid = formData.employeeid;
        this.account.employeename = formData.employeename;
        this.account.email = formData.email;
        this.account.password = formData.password;
        console.log(this.account);
        this.updateData(this.account);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.onClose();
    }
  }

  updateData(account: AccountProfile){
    this.service.updatePut(account).then(
      (data:any) => {
        this.updateStorage(data);
        // if the method below being called using async way, then the table desc wont be updated accordingly after data added
        alert("Profile Detail Updated successfully.");
        location.reload();
      });
  }

  updateStorage(data: any){
    sessionStorage.removeItem('account');
    sessionStorage.setItem('account',JSON.stringify(data));
  }

}

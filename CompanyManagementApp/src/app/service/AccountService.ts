import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountProfile } from '../model/AccountProfile';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class AccountService {

  form: FormGroup = new FormGroup({
    employeeid: new FormControl(null),
    employeename: new FormControl('', Validators.required),    
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      employeeid: null,
      employeename: '',
      email: '',
      password: '',
    });
  }

  activityList: any;
 
  constructor(private http:HttpClient) {}
 
  private employeeUrl = 'http://localhost:8081/AccountProfile/';

  // get email to compare
  public getSelectedEmail(email: string): Promise<any>{
    return new Promise((resolve) => {
    return this.http.get<AccountProfile>(this.employeeUrl+'findProfileByEmail/'+email).subscribe((data: any) => {
      //data testing, should removed for real application
      console.log(data);
      resolve(data);
    })
  });
  }

  //sign up account
  public addPost(body: any): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.post(this.employeeUrl+"saveEmployee", body).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }

  //edit account
  public updatePut(body: any): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.put(this.employeeUrl+"editEmployee", body).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }

//delete account
  public delete(id: any): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.delete(this.employeeUrl+"deleteProfileById/"+id).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }
  
}
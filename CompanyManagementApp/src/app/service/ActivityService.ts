import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from 'src/app/model/Activity';
import { FormControl, FormGroup, Validators } from '@angular/forms';
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ActivityService {
  activityList: any;
 
  constructor(private http:HttpClient) {}
 
  private employeeUrl = 'http://localhost:8081/Activity/';

  form: FormGroup = new FormGroup({
    activityid: new FormControl(null),
    activityname: new FormControl('', Validators.required),    
    estDate: new FormControl('', Validators.required),
    actDate: new FormControl(''),
    comment: new FormControl(''),
    status: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      activityid: null,
      activityname: '',
      estDate: '',
      actDate: '',
      comment: '',
      status: '',
    });
  }

  public sessionData(){
    var stringData = sessionStorage.getItem("account");
    var obj = JSON.parse(stringData!);
    console.log(obj.employeeid);
    return obj.employeeid;
  }
 
  public getEmps() {
    return this.http.get<Activity[]>(this.employeeUrl+this.sessionData()+'/activity');
  }

  public getTotal() {
    return this.http.get(this.employeeUrl+this.sessionData()+'/totalStatus');
  }

  public getTotal2(stat: string) {
    return this.http.get(this.employeeUrl+this.sessionData()+'/totalOther/stat?stat='+stat);
  }

  public addPost(body: any): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.post(this.employeeUrl+this.sessionData()+"/activity", body).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }

  public updatePut(body: any, activityid: number): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.put(this.employeeUrl+this.sessionData()+"/activity/"+activityid, body).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }

  public delete(id: any): Promise<any>  {
    return new Promise((resolve) => {
    return this.http.delete(this.employeeUrl+this.sessionData()+"/activity/"+id).subscribe((data: any) => {
      console.log(data);
      resolve(data);
    })
    });
  }
  
}
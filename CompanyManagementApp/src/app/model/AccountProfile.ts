import { Activity } from "./Activity";

export class AccountProfile{
    employeeid!: number;
	
	employeename!: string;
	
	password!: string;
	
	email!: string;

	activity!: Activity[];

	// constructor(employeeid: number, employeename: string, password: string, email: string, activity: Activity[])
	// {
	//   this.employeeid = employeeid;
	//   this.employeename = employeename;
	//   this.password = password;
	//   this.email = email;
	//   this.activity = activity;
	// }
}
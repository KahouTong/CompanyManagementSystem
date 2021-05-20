export class Activity{
    activityid: number;
	
	activityname: string;
	
	estdate: string;
	
	actdate: string;

	comment: string;

    status: string;

	constructor(activityid: number, activityname: string, estdate: string, actdate: string, comment: string, status: string,)
	{
	  this.activityid = activityid;
	  this.activityname = activityname;
	  this.estdate = estdate;
	  this.actdate = actdate;
	  this.comment = comment;
	  this.status = status;
	}

}
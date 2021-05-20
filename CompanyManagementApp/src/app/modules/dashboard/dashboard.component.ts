import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService} from 'src/app/service/ActivityService';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  total!: string;

  Compl!: string;

  Incompl!: string;

  stat!: string;

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  activityList: any;

  constructor(private service: ActivityService) { 
   };

  displayedColumns: string[] = ['activityid','activityname','status'];

  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.showAllRecords(); 
    this.totalActivity(); 
    this.totalOther();
    this.totalOther2();
  };

  showAllRecords()
    {
      this.service.getEmps()
      .subscribe( data => {
       this.activityList=data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.activityList); 
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;   
      });
    }

    totalActivity(){
      this.service.getTotal().subscribe(
        (data: any) => {
          this.total=data;
          console.log(data);
        }
      );
    }

    totalOther(){
      this.service.getTotal2(this.stat="Completed").subscribe(
        (data: any) => {
          this.Compl=data;
          console.log(data);
        }
      );
    }

    totalOther2(){
      this.service.getTotal2(this.stat="Incomplete").subscribe(
        (data: any) => {
          this.Incompl=data;
          console.log(data);
        }
      );
    }

}

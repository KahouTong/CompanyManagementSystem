import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService } from 'src/app/service/ActivityService';
import { MatDialog} from "@angular/material/dialog";
import {MatDialogConfig} from "@angular/material/dialog";
import { FormsComponent } from 'src/app/shared/widgets/forms/forms.component';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  updateObject: any;

  constructor(private service: ActivityService, private dialog: MatDialog) { } 

  listData: any;
  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['activityid', 'activityname', 'estdate', 'actdate', 'comment','status','actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  
  ngOnInit() {
    this.showAllRecords();  
  }

  showAllRecords()
    {
      this.service.getEmps().subscribe( data => {
        this.listData=data;
          console.log(data);
        this.dataSource = new MatTableDataSource(this.listData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toString().toLowerCase().indexOf(filter) != -1;
          });
        };
      });
    }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    const dialogRef = this.dialog.open(FormsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.flag){
        this.showAllRecords();
      }
    });
  }

  onSelectUpdate(row: any){
    console.log(row);
    this.service.form.patchValue(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    const dialogRef = this.dialog.open(FormsComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result.flag){
        this.showAllRecords();
      }
    });
  }

  onDelete(activityid: any){
    if(confirm('Are you sure to delete this record ?')){
      console.log(activityid);
    this.service.delete(activityid);
    alert('! Deleted successfully');
    this.showAllRecords();
    }
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountService } from 'src/app/service/AccountService';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { ProfileComponent } from '../../widgets/profile/profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public loginService: AuthenticationService, private dialog: MatDialog, public service: AccountService) { }

  ngOnInit() { }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  onProfile(){
    var stringData = sessionStorage.getItem("account");
    var obj = JSON.parse(stringData!);
    this.service.form.patchValue(obj);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "auto";
    const dialogRef = this.dialog.open(ProfileComponent,dialogConfig);
  }

}

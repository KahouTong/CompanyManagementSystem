import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountProfile } from '../model/AccountProfile';
import { AccountService } from '../service/AccountService';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = ''
  password = ''
  repeatPass = ''
  temp!: any;
  invalidLogin = false
  account: AccountProfile = new AccountProfile();

  constructor(private router: Router,
    private loginservice: AuthenticationService, private accountService: AccountService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.accountService.getSelectedEmail(this.email).then((data: any) => {
      this.temp = data;
      if (this.loginservice.authenticate(this.email, this.password, this.temp.email, this.temp.password)) {
        sessionStorage.setItem('account', JSON.stringify(this.temp));
        this.router.navigate([''])
        this.invalidLogin = false
      } else
        this.invalidLogin = true
    });

  }

  signUp(){
    if(this.repeatPass == this.account.password){
    this.accountService.addPost(this.account).then(
      resolve => {
        // if the method below being called using async way, then the table desc wont be updated accordingly after data added
        alert("Activity Addded successfully.");
      });
    }
    else
    alert("Repeat Password is not matched with password !")
  }

}
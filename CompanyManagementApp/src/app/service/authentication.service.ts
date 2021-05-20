import { Injectable } from '@angular/core';
import { AccountService } from './AccountService';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(public service: AccountService) { }

  authenticate(email: string, password: string, email2: string, password2: string) {
        if (email == email2 && password == password2) {       
          return true;
        } else {
          return false;
        }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('account')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.clear()
  }
}
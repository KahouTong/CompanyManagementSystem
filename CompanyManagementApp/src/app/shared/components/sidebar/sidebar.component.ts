import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  item = sessionStorage.getItem('account');

  data = JSON.parse(this.item!);

  username = this.data.employeename;

  email = this.data.email;

  text = this.data.employeename;

  url = 'https://www.materialui.co/materialIcons/action/account_circle_grey_192x192.png';

  constructor() { }

  ngOnInit(): void {
  }

}

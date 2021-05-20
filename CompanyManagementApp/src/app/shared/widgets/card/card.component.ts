import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  label!: string;
  @Input()
  total!: string;
  @Input()
  icon!: string;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  colorSelect(){
    if (this.label == "Total Completed")
    {
      return "green";
    }
    else if (this.label == "Total Incomplete")
    {
      return "red";
    }
    else
    {
      return "black";
    }
  }

}

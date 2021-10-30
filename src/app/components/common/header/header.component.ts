import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public title: string | any;
  @Input() public page: string | any;
  @Input() public backLink: string | any;

  constructor() {
  }

  ngOnInit(): void {
  }

}

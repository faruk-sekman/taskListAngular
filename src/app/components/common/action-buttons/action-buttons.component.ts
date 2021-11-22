import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import {VoteModel} from "../../../_core/_models/vote.model";

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit, AfterViewInit{
  @Input() public vote: VoteModel | any;
  @Output() public deletePopup = new EventEmitter();

  constructor() {
  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let buttons: any = null;
    buttons = Array.from(document.querySelectorAll('.dropdown-toggle'));

    buttons.forEach((item: any, i: any) => {
      const open = () => {
        item.classList.add('active');
        item.nextElementSibling.classList.add('active');
      }
      const close = () => {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('active');
      }
      item.addEventListener('click', () => {
        if (!item.classList.contains('active')) {
          open();
        } else {
          close();
        }
      });

      document.body.addEventListener('click', (e) => {
        let isClickInsideButton = item.contains(e.target);
        if (!isClickInsideButton) {
          close();
        }
      });
    });
  }

  delete(vote: VoteModel): void {
    this.deletePopup.emit(vote);
  }
}

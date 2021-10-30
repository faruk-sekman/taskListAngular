import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {VoteModel} from "../../../_core/_models/vote.model";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() public showPopup: boolean | any;
  @Input() public vote: VoteModel | any;
  @Input() public options:any;

  @Output() public delete = new EventEmitter();
  @Output() public close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }

  deleteItem(vote: VoteModel) {
    this.delete.emit(vote);
  }

  closePopup() {
    this.close.emit();
  }
}

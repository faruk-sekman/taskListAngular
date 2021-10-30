import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {VoteModel} from "../../_core/_models/vote.model";

@Component({
  selector: 'app-vote-box',
  templateUrl: './vote-box.component.html',
  styleUrls: ['./vote-box.component.scss']
})
export class VoteBoxComponent implements OnInit {
  @Input() public vote: VoteModel | any;

  @Output() public updateVote = new EventEmitter();

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  update(e: any, id: number, count: number, update: string) {
    let votedType, isVoted;
    if (update === 'up') {
      count = count + 1;
      votedType = '+1';
      isVoted = true;
    } else if (update === 'down') {
      if (count - 1 <= 0) {
        count = 0;
      } else {
        count = count - 1;
        votedType = '-1';
        isVoted = true;
      }
    } else {
      return;
    }
    this.updateVote.emit({
      event: e,
      id: this.vote.id,
      voteCount: count,
      votedType: votedType,
      isVoted: isVoted
    });
  }
}

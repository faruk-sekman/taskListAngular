import {Component, OnInit, Input, Output, EventEmitter, ElementRef} from '@angular/core';
import {VoteModel} from "../../../_core/_models/vote.model";

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

  update(e: any, vote:VoteModel, update:string) {
    if (update === 'up') {
      vote.voteCount = vote.voteCount + 1;
      vote.votedType = '+1';
      vote.isVoted = true;
    } else if (update === 'down') {
      if (vote.voteCount - 1 <= 0) {
        vote.voteCount = 0;
      } else {
        vote.voteCount = vote.voteCount - 1;
        vote.votedType = '-1';
        vote.isVoted = true;
      }
    } else {
      return;
    }
    this.updateVote.emit({
      event: e,
      vote: vote
    });
  }
}

import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {GlobalService} from "../../_core/_services/global.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  // votes
  public vote: VoteModel | any;
  @Input() public votes: VoteModel[] = [];
  @Input() public itemCount: number | any;

  @Output() public delete = new EventEmitter();

  public loading: boolean = false;
  public p: number = 1;

  asc: boolean = false;
  desc: boolean = false;

  constructor(private voteService: VoteService, private globalService: GlobalService) {

  }

  ngOnInit(): void {
  }

  deleteItem(vote: VoteModel) {
    this.delete.emit(vote);
  }

  updateVote(e: any) {
    this.loading = true;
    this.vote = this.votes.filter(item => item.id === e.id);
    this.vote[0].voteCount = e.voteCount;
    this.vote[0].votedType = e.votedType;
    this.vote[0].isVoted = e.isVoted;
    this.vote[0].modifiedDate = this.globalService.createdDate();
    this.voteService.updateVote(this.vote).subscribe(vote => {
      this.vote = vote;
      if (!this.asc && !this.desc) {
        this.votes = this.globalService.sortDataModifiedDate(this.votes);
      } else {
        if (this.asc) {
          this.sort(null, 'asc', true);
        } else if (this.desc) {
          this.sort(null, 'desc', true);
        }
      }
      this.globalService.setDataLocalStorage(this.votes);
      this.loading = false;
    });
  }

  sort(e: any, sort: any, isUpdate?: boolean) {
    if (isUpdate) {
      if (sort === 'desc') {
        this.votes = this.globalService.sortDataRatingDesc(this.votes);
      }  else if (sort === 'asc') {
        this.votes = this.globalService.sortDataRatingAsc(this.votes);
      }
    } else {
      if (sort === 'desc') {
        this.desc = !this.desc;
        this.asc = false;
        if (this.desc) {
          this.votes = this.globalService.sortDataRatingDesc(this.votes);
        } else {
          this.votes = this.globalService.sortDataModifiedDate(this.votes);
        }
      } else if (sort === 'asc') {
        this.asc = !this.asc;
        this.desc = false;
        if (this.asc) {
          this.votes = this.globalService.sortDataRatingAsc(this.votes);
        } else {
          this.votes = this.globalService.sortDataModifiedDate(this.votes);
        }
      } else {
        return;
      }
    }
  }
}

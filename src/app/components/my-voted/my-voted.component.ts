import { Component, OnInit } from '@angular/core';
import {VoteModel} from "../../_core/_models/vote.model";
import {NotificationModel} from "../common/notification/notification.model";
import {VoteService} from "../../_core/_services/vote.service";
import {GlobalService} from "../../_core/_services/global.service";

@Component({
  selector: 'app-my-voted',
  templateUrl: './my-voted.component.html',
  styleUrls: ['./my-voted.component.scss']
})
export class MyVotedComponent implements OnInit {

  // votes
  public vote: VoteModel | any;
  public votes: VoteModel[] = [];
  public itemCount: number | any;

  // header
  public pageTitle: string = 'Oyladıklarım';
  public page: string = 'my-voted';
  public backLink: string = '/';

  public loading: boolean = true;

  constructor(private voteService: VoteService, private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getMyVoted();
  }

  getMyVoted(): void {
    let data: VoteModel;
    data = this.globalService.getDataLocalStorage('votesData');
    if (data || data !== null) {
      this.votes = this.globalService.getMyVoted(this.globalService.sortDataModifiedDate(data));
      this.itemCount = this.votes.length;
      this.loading = false;
    } else {
      this.voteService.getVotes()
        .subscribe(votes => {
          this.votes = this.globalService.getMyVoted(this.globalService.sortDataModifiedDate(votes));
          this.itemCount = this.votes.length;
          this.loading = false;
        });
    }
  }
  delete(votes: VoteModel[]): void {
    this.votes = this.globalService.getMyVoted(votes);
    this.itemCount = this.votes.length;
  }
  updateMyVoted(votes: VoteModel[]) {
    this.votes = this.globalService.getMyVoted(votes);
  }
  sortMyVoted(votes: VoteModel[]) {
    this.votes = this.globalService.getMyVoted(votes);
  }
}

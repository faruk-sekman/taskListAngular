import {Component, OnInit} from '@angular/core';
import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {GlobalService} from "../../_core/_services/global.service";

@Component({
  selector: 'app-vote',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // votes
  public vote: VoteModel | any;
  public votes: VoteModel[] = [];
  public itemCount: number | any;

  // header
  public pageTitle: string = 'Task Listesi';
  public page: string = 'home';
  public backLink: string = '';

  public loading: boolean = true;

  constructor(private voteService: VoteService, private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getVotes();
  }

  getVotes(): void {
    let data: VoteModel;
    data = this.globalService.getDataLocalStorage('votesData');
    if (data || data !== null) {
      this.votes = this.globalService.sortDataModifiedDate(data);
      this.itemCount = this.votes.length;
      this.loading = false;
    } else {
      this.voteService.getVotes()
        .subscribe(votes => {
          this.votes = this.globalService.sortDataModifiedDate(votes);
          this.itemCount = this.votes.length;
          this.loading = false;
        });
    }
  }


}

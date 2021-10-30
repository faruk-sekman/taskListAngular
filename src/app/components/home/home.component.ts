import {Component, OnInit} from '@angular/core';
import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {NotificationModel} from "../common/notification/notification.model";
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

  public loading: boolean = false;

  // popup
  public showPopup: boolean = false;

  // Notification
  public isNotification: boolean = false;
  public notificationOptions: NotificationModel  = {
    position: 'bottom-right',
    type: 'info',
    delay: 3000,
    autoClose: true,
    message: 'işleminiz gerçekleşmiştir.',
    isShow: false
  };

  constructor(private voteService: VoteService, private globalService: GlobalService) {
  }

  ngOnInit(): void {
    this.getVotes();
  }

  getVotes(): void {
    this.voteService.getVotes()
      .subscribe(votes => {
        this.votes = this.globalService.sortDataModifiedDate(votes);
        this.itemCount = this.votes.length;
      });
  }
  delete(vote: VoteModel): void {
    this.loading = true;
    const name = vote.name;
    this.isNotification = false;
    this.votes = this.votes.filter(h => h !== vote);
    this.voteService.deleteVote(vote).subscribe(vote => {
      this.itemCount = this.votes.length;
      this.globalService.setDataLocalStorage(this.votes);
      this.closePopup();
      this.notificationOptions  = {
        position: 'bottom-right',
        type: 'success',
        message: name + ' ögesi başarıyla silinmiştir.',
        isShow: true
      };
      this.isNotification = true;
      this.loading = false;
    });
  }
  deletePopup(vote: VoteModel): void {
    this.vote = vote;
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
    this.vote = null;
  }
}

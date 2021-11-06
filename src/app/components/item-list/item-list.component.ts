import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {GlobalService} from "../../_core/_services/global.service";
import {NotificationModel} from "../common/notification/notification.model";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  // votes
  @Input() public vote: VoteModel | any;
  @Input() public votes: VoteModel[] = [];
  @Input() public itemCount: number | any;

  // header
  public pageTitle: string = 'Task Listesi';
  public page: string = 'home';
  public backLink: string = '';

  public loading: boolean = true;

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

  @Output() public delete = new EventEmitter();
  @Output() public updateMyVoted = new EventEmitter();
  @Output() public sortMyVoted = new EventEmitter();

  public p: number = 1;

  asc: boolean = false;
  desc: boolean = false;

  constructor(private voteService: VoteService, private globalService: GlobalService) {

  }

  ngOnInit(): void {
    this.loading = false;
  }

  deleteItem(vote: VoteModel) {
    this.loading = true;
    this.isNotification = false;
    let data: VoteModel[];
    this.voteService.deleteVote(vote).subscribe(item => {
      this.votes =  this.votes.filter(e => e.id !== vote.id);
      this.itemCount = this.votes.length;
      data = this.globalService.getDataLocalStorage('votesData');
      data = data.filter(e => e.id !== vote.id);
      this.globalService.setDataLocalStorage('votesData', data);
      this.closePopup();
      this.notificationOptions  = {
        position: 'bottom-right',
        type: 'success',
        message: vote.name + ' ögesi başarıyla silinmiştir.',
        isShow: true
      };
      this.isNotification = true;
      this.loading = false;
      this.delete.emit(this.votes);
    });
  }

  updateVote(e: any) {
    let data: VoteModel[];
    this.loading = true;
    this.vote = this.votes.filter(item => item.id === e.vote.id);
    this.vote[0].voteCount = e.vote.voteCount;
    this.vote[0].votedType = e.vote.votedType;
    this.vote[0].isVoted = e.vote.isVoted;
    this.vote[0].modifiedDate = this.globalService.createdDate();
    this.voteService.updateVote(this.vote[0]).subscribe(vote => {
      let findIndex;
      findIndex = this.votes.findIndex(x => x.id == e.vote.id);
      this.votes[findIndex] = e.vote;
      if (!this.asc && !this.desc) {
        this.votes = this.globalService.sortDataModifiedDate(this.votes);
      } else {
        if (this.asc) {
          this.sort(null, 'asc', true);
        } else if (this.desc) {
          this.sort(null, 'desc', true);
        }
      }
      data = this.globalService.getDataLocalStorage('votesData');
      let localFindIndex;
      localFindIndex = data.findIndex(x => x.id == e.vote.id);
      data[localFindIndex] = e.vote;
      this.globalService.setDataLocalStorage('votesData', data);
      this.updateMyVoted.emit(this.votes);
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
    this.sortMyVoted.emit(this.votes);
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

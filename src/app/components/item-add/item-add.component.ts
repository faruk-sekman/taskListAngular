import { Component, OnInit, AfterViewInit} from '@angular/core';

import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {NotificationModel} from "../common/notification/notification.model";
import {GlobalService} from "../../_core/_services/global.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit, AfterViewInit{
  public votes: VoteModel[] = [];
  public itemCount: number | any;
  public pageTitle: string = 'Yeni Ekle';
  public page: string = 'item-add';
  public backLink: string = '/votes';
  public isNotification: boolean = false;
  public inputVal: string = '';
  public inputValValid: boolean = false;
  public loading: boolean = true;
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
    let data: VoteModel[];
    data = this.globalService.getDataLocalStorage('votesData');
    if (data || data !== null) {
      this.itemCount = data.length;
      this.loading = false;
    } else {
      this.voteService.getVotes()
        .subscribe(votes => {
          this.votes = votes;
          this.itemCount = this.votes.length;
          this.loading = false;
        });
    }
  }

  ngAfterViewInit() {
    const input:any = document.getElementById('voteName');
    input.focus();
  }

  onEnter(e:any): void {
    this.add(e.currentTarget.value);
  }

  add(name: string): void {
    this.isNotification = false;
    this.loading = true;
    name = name.trim();
    if (!name) { return; }

    this.voteService.addVote({ name, voteCount: 0, id:this.globalService.randomId(), createdDate: this.globalService.createdDate(), modifiedDate: this.globalService.createdDate(), isVoted: false, votedType:''} as VoteModel)
      .subscribe(vote => {
        let data: VoteModel[];
        data = this.globalService.getDataLocalStorage('votesData');
        if (data || data !== null) {
          this.votes = data
          this.votes.push(vote);
          this.votes = this.globalService.sortDataModifiedDate(this.votes);
          this.globalService.setDataLocalStorage('votesData', this.votes);
          this.itemCount = this.votes.length;
          this.loading = false;
        } else {
          this.voteService.getVotes()
            .subscribe(votes => {
              this.votes = votes;
              this.votes.push(vote);
              this.votes = this.globalService.sortDataModifiedDate(this.votes);
              this.globalService.setDataLocalStorage('votesData', this.votes);
              this.itemCount = this.votes.length;
              this.loading = false;
            });
        }
        this.isNotification = true;
        this.notificationOptions  = {
          position: 'bottom-right',
          type: 'success',
          message: name + ' başarıyla eklenmiştir.',
          isShow: true
        };
      }, error => this.loading = false);
  }
}

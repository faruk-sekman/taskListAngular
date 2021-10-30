import { Component, OnInit } from '@angular/core';
import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {NotificationModel} from "../common/notification/notification.model";
import {GlobalService} from "../../_core/_services/global.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {
  public votes: VoteModel[] = [];
  public itemCount: number | any;
  public pageTitle: string = 'Yeni Ekle';
  public page: string = 'item-add';
  public backLink: string = '/votes';
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

  }

  onEnter(e:any): void {
    this.add(e.currentTarget.value);
  }

  add(name: string): void {
    this.isNotification = false;
    name = name.trim();
    if (!name) { return; }

    this.voteService.addVote({ name, voteCount: 0, id:this.globalService.randomId(), createdDate: this.globalService.createdDate(), modifiedDate: this.globalService.createdDate(), isVoted: false, votedType:''} as VoteModel)
      .subscribe(vote => {
        this.votes.push(vote);
        let data:any;
        this.voteService.getVotes().subscribe(votes => {
          data = votes;
          this.globalService.setDataLocalStorage(data);
        });
        this.itemCount = this.votes.length;
        this.isNotification = true;
        this.notificationOptions  = {
          position: 'bottom-right',
          type: 'success',
          message: name + ' başarıyla eklenmiştir.',
          isShow: true
        };
      });
  }
}

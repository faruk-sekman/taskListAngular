import { Component, OnInit, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {VoteModel} from "../../_core/_models/vote.model";
import {VoteService} from "../../_core/_services/vote.service";
import {NotificationModel} from "../common/notification/notification.model";
import {GlobalService} from "../../_core/_services/global.service";
import {AuthenticationService} from "../../_core/_services/authentication.service";
import {UserModel} from "../../_core/_models/user.model";
import {RoleModel} from "../../_core/_models/role.model";

@Component({
  selector: 'app-add-item',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit, AfterViewInit{
  public user: UserModel | any;
  public vote: VoteModel | any = {};
  public votes: VoteModel[] = [];
  public itemCount: number | any;
  public pageTitle: string = 'Yeni Ekle';
  public page: string = 'item';
  public backLink: string = '/votes';
  public isNotification: boolean = false;
  public inputVal: string = '';
  public inputValValid: boolean = false;
  public loading: boolean = true;
  public itemForm!: FormGroup | any;
  public submitted = false;
  public error = '';
  public id!: number;
  public isAddMode!: boolean;
  public notificationOptions: NotificationModel  = {
    position: 'bottom-right',
    type: 'info',
    delay: 3000,
    autoClose: true,
    message: 'işleminiz gerçekleşmiştir.',
    isShow: false
  };
  public currentRoute: string;
  constructor(private voteService: VoteService,
              private globalService: GlobalService,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.authenticationService.user.subscribe(x => this.user = x);
    this.currentRoute = '';
    this.router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        if (event.url === '/item') {
          this.isAddMode = true;
          if (this.itemForm){
            this.submitted = false;
             this.itemForm.reset();
          }
          const input:any = document.getElementById('voteName');
          input.focus();
        }
      }
    });
  }

  ngOnInit(): void {
    if (this.route.firstChild !== null) {
      // @ts-ignore
      this.id = parseInt(this.route.firstChild.params.value.id);
    }
    this.isAddMode = !this.id;

    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.loading = true;
      this.voteService.getById(this.id)
        .subscribe(vote => {
          this.vote = vote;
          this.itemForm.patchValue(vote);
          this.loading = false;
        });
    }

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

  get f() { return this.itemForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.itemForm.invalid) {
      return;
    }

    this.isNotification = false;
    this.loading = true;
    if (this.user && this.user.role === RoleModel.Admin) {
      if (this.isAddMode) {
        this.createUser();
      } else {
        this.updateUser();
      }
    }
  }

  private createUser() {
    const thisVal = this.itemForm.value,
          otherVal = {'voteCount': 0, 'id':this.globalService.randomId(), 'createdDate': this.globalService.createdDate(), 'modifiedDate': this.globalService.createdDate(), 'isVoted': false, 'votedType':''};

    this.itemForm.value = {...thisVal, ...otherVal} as VoteModel;
    this.voteService.addVote(this.itemForm.value)
      .pipe(first())
      .subscribe((vote) => {
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
        // this.router.navigate(['../'], { relativeTo: this.route });
      }, error => this.loading = false)
      .add(() => this.loading = false);
  }

  private updateUser() {
    const thisVal = this.itemForm.value,
      otherVal = {'voteCount': this.vote.voteCount, 'id':this.vote.id, 'createdDate': this.vote.createdDate, 'modifiedDate': this.globalService.createdDate(), 'isVoted': this.vote.isVoted, 'votedType':this.vote.votedType};

    this.itemForm.value = {...thisVal, ...otherVal} as VoteModel;

    this.voteService.updateVote(this.itemForm.value)
      .pipe(first())
      .subscribe((vote) => {
        let data: VoteModel[];
        data = this.globalService.getDataLocalStorage('votesData');
        let findIndex;
        findIndex = data.findIndex(x => x.id == this.itemForm.value.id);
        data[findIndex] = this.itemForm.value;
        this.votes = data;
        this.globalService.setDataLocalStorage('votesData', data);
        this.loading = false;
        // this.router.navigate(['../../'], { relativeTo: this.route });
      })
      .add(() => this.loading = false);
  }
}

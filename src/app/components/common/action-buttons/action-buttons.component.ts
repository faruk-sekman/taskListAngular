import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';
import {VoteModel} from "../../../_core/_models/vote.model";
import {RoleModel} from "../../../_core/_models/role.model";
import {UserModel} from "../../../_core/_models/user.model";
import {AuthenticationService} from "../../../_core/_services/authentication.service";

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit, AfterViewInit{
  @Input() public vote: VoteModel | any;
  @Output() public deletePopup = new EventEmitter();

  public user: UserModel | any;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }


  ngOnInit(): void {

  }

  ngAfterViewInit() {
    let buttons: any = null;
    buttons = Array.from(document.querySelectorAll('.dropdown-toggle'));

    buttons.forEach((item: any, i: any) => {
      const open = () => {
        item.classList.add('active');
        item.nextElementSibling.classList.add('active');
      }
      const close = () => {
        item.classList.remove('active');
        item.nextElementSibling.classList.remove('active');
      }
      item.addEventListener('click', () => {
        if (!item.classList.contains('active')) {
          open();
        } else {
          close();
        }
      });

      document.body.addEventListener('click', (e) => {
        let isClickInsideButton = item.contains(e.target);
        if (!isClickInsideButton) {
          close();
        }
      });
    });
  }

  delete(vote: VoteModel): void {
    this.deletePopup.emit(vote);
  }

  get isGuest(): boolean {
    return this.user && this.user.role === RoleModel.Guest;
  }
  get isAdmin(): boolean {
    return this.user && this.user.role === RoleModel.Admin;
  }
  get isUser(): boolean {
    return this.user && this.user.role === RoleModel.User;
  }
}

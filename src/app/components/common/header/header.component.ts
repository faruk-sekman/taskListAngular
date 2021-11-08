import { Component, OnInit, Input } from '@angular/core';
import {UserModel} from "../../../_core/_models/user.model";
import {AuthenticationService} from "../../../_core/_services/authentication.service";
import {RoleModel} from "../../../_core/_models/role.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: UserModel | any;

  @Input() public title: string | any;
  @Input() public page: string | any;
  @Input() public backLink: string | any;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
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
  logout() {
    this.authenticationService.logout();
  }
}




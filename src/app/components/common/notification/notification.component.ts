import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {NotificationModel} from "./notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, AfterViewInit {
  @Input() public options: NotificationModel | any;
  constructor() {
  }

  ngOnInit(): void {
    if (this.options === [] || this.options === undefined || this.options === null || !this.options) {
      // Default Options
      this.options = {
        position: 'bottom-right',
        type: 'info',
        delay: 3000,
        autoClose: true,
        message: 'işleminiz gerçekleşmiştir.',
        isShow: false
      };
    } else {
      if (this.options.isShow) {
        this.options.delay = this.options.delay ? this.options.delay : 3000;
        this.options.position = this.options.position ? this.options.position : 'bottom-right';
        this.options.type = this.options.type ? this.options.type : 'info';
        this.options.autoClose = this.options.autoClose ? this.options.autoClose : true;
        this.options.message = this.options.message ? this.options.message : 'işleminiz gerçekleşmiştir.';

        if (this.options.autoClose) {
          setTimeout(()=>{
            this.options.isShow = false
          }, this.options.delay);
        }
      }
    }
  }

  ngAfterViewInit() {

  }

  closeNotification(e: any) {
  this.options.isShow = false;
  }
}

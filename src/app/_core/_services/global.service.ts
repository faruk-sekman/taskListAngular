import { Injectable } from '@angular/core';
import {VoteModel} from "../_models/vote.model";

@Injectable({ providedIn: 'root' })
export class GlobalService {

  public randomId(): any {
    return Math.floor(Math.random() * 1000000);
  }
  public createdDate(): any {
    let date: any = new Date();
    return date;
  }
  public getMyVoted(data:VoteModel[]) {
    return data.filter(item => item.isVoted);
  }
  public sortDataModifiedDate(data:any) {
    return data.sort((a:any, b:any) => {
      return <any>new Date(b.modifiedDate) - <any>new Date(a.modifiedDate);
    });
  }
  public sortDataRatingDesc(data:any) {
    return data.sort((a:any, b:any) => {
      return <any>new Date(b.voteCount) - <any>new Date(a.voteCount);
    });
  }
  public sortDataRatingAsc(data:any) {
    return data.sort((a:any, b:any) => {
      return <any>new Date(a.voteCount) - <any>new Date(b.voteCount);
    });
  }
  public setDataLocalStorage(name:string, votes: VoteModel[]) {
    return localStorage.setItem(name, JSON.stringify(votes));
  }

  public getDataLocalStorage(name:string): any {
    return JSON.parse(<string>localStorage.getItem(name));
  }
}

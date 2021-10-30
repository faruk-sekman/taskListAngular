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
  public setDataLocalStorage(votes: VoteModel[]) {
    return localStorage.setItem('votesData', JSON.stringify(votes));
  }

  public getDataLocalStorage(): any {
    return JSON.parse(<string>localStorage.getItem('votesData'));
  }
}

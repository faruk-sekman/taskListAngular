import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {VoteModel} from '../_models/vote.model';
import {GlobalService} from './global.service'

@Injectable({
  providedIn: 'root',
})
export class VotesDataService implements InMemoryDbService {

  public data: VoteModel[] | any;

  constructor(private globalService: GlobalService) {
  }

  createDb() {
    let votes: VoteModel[];
    this.data = this.globalService.getDataLocalStorage('votesData');
    if(this.data || this.data !== null){
      votes = this.data;
    } else {
      votes = [
        {
          id: this.globalService.randomId(),
          name: 'Task 1',
          voteCount: 4,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '',
          isVoted:  false
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 2',
          voteCount: 6,
          createdDate: 'Fri Oct 29 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 29 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '',
          isVoted:  false
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 3',
          voteCount: 1,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '-1',
          isVoted:  true
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 4',
          voteCount: 3,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '-1',
          isVoted:  true
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 5',
          voteCount: 2,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '-1',
          isVoted:  true
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 6',
          voteCount: 1,
          createdDate: 'Fri Oct 29 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 29 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '+1',
          isVoted:  true
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 7',
          voteCount: 11,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '+1',
          isVoted:  true
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 8',
          voteCount: 12,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '',
          isVoted:  false
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 9',
          voteCount: 13,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '',
          isVoted:  false
        },
        {
          id: this.globalService.randomId(),
          name: 'Task 10',
          voteCount: 54,
          createdDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          modifiedDate: 'Fri Oct 28 2021 17:39:07 GMT+0300 (GMT+03:00)',
          votedType: '+1',
          isVoted:  true
        }
      ];

      this.globalService.setDataLocalStorage('votesData', votes);
    }
    return {votes};
  }
}

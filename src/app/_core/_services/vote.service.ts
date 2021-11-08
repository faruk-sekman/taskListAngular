import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';

import { VoteModel } from '../_models/vote.model';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VoteService {
  public readonly apiUrl: string = environment.apiVotesUrl;

  constructor(
    private http: HttpClient) { }

  getVotes(): Observable<VoteModel[]> {
    return this.http.get<VoteModel[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<VoteModel[]>('getVotes', []))
      );
  }

  addVote(vote: VoteModel): Observable<VoteModel> {
    return this.http.post<VoteModel>(this.apiUrl, vote).pipe(
      catchError(this.handleError<VoteModel>('addVote'))
    );
  }

  deleteVote(vote: VoteModel | number): Observable<VoteModel> {
    const id = typeof vote === 'number' ? vote : vote.id;
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<VoteModel>(url).pipe(
      catchError(this.handleError<VoteModel>('deleteVote'))
    );
  }

  updateVote(vote: VoteModel): Observable<any> {
    return this.http.put(this.apiUrl, vote).pipe(
      catchError(this.handleError<any>('updateVote'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

export interface VoteModel {
  id: number;
  name: string;
  voteCount:number;
  createdDate: string;
  modifiedDate: string;
  votedType: string;
  isVoted:  boolean;
}

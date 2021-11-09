export interface VoteModel {
  id: number;
  name: string;
  description: string;
  voteCount:number;
  createdDate: string;
  modifiedDate: string;
  votedType: string;
  isVoted:  boolean;
}

export interface VoteInfo {
  pollId: string;
  options: string[];
  votedOn: number;
}

export interface OptionSelectedEvent {
  option: string;
}

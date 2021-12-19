export enum StackingDuration {
  ONE_MONTH = 0,
  THREE_MONTHS = 1,
  SIX_MONTHS = 2,
  ONE_YEAR = 3,
}

export interface Stake {
  since: string;
  amount: number;
  period: any;
}

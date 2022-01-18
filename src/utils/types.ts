export enum StackingDuration {
  ONE_MONTH = 0,
  THREE_MONTHS = 1,
  SIX_MONTHS = 2,
  ONE_YEAR = 3,
  THREE_YEARS = 4,
}

export interface Stake {
  since: string;
  amount: number;
  period: any;
}

export interface LaunchpadProject {
  id: number;
  title: string;
  coin: string;
  description: string;
  about: string;
  imageSource: string;
}
export enum CoinTags {}

export type Project = {
  name: "The Luxury Bank" | "The Luxury Coin" | "Luxanida" | "Beez";
  tag: "TLX" | "TLC" | "LSO" | "BEEZ";
};

// export const defaultPowers = {
//   // all values are represented as percentage
//   tlx: {
//     one_month: 0.1,
//     three_months: 0.3,
//     six_months: 0.5,
//     one_year: 0.7,
//     three_years: 1,
//   },
//   tlc: {
//     one_month: 0.01,
//     three_months: 0.03,
//     six_months: 0.05,
//     one_year: 0.07,
//     three_years: 0.1,
//   },
//   lso: {
//     one_month: 0.01,
//     three_months: 0.03,
//     six_months: 0.05,
//     one_year: 0.07,
//     three_years: 0.1,
//   },
// };

export const defaultPowers = {
  // all values are represented as percentage
  TLX: [0.1, 0.3, 0.5, 0.7, 1],
  TLC: [0.01, 0.03, 0.05, 0.07, 0.1],
  LSO: [0.01, 0.03, 0.05, 0.07, 0.1],

  // '"tlx"': [0.1, 0.3, 0.5, 0.7, 1],
  // '"tlc"': [0.01, 0.03, 0.05, 0.07, 0.1],
  // '"lso"': [0.01, 0.03, 0.05, 0.07, 0.1],
};

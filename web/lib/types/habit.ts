export type DAILY_FREQUENCY = {
  type: "DAILY";
}

export type PERIOD_COUNT_FREQUENCY = {
  type: "PERIOD_COUNT";
  count: number;
  period: "WEEK" | "MONTH" | "YEAR";
}
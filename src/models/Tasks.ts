import Schedule, { Interval } from "./Schedule";

export interface Task {
  id: string;
  name: string;
  lastCompletionDate?: Date;
}

const intervalIdentifiers = {
  [Interval.daily]: ["day"],
  [Interval.weekly]: [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ],
  [Interval.monthly]: [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "novemeber",
    "december",
  ],
  [Interval.yearly]: ["year"],
};

const DAILY_MAX = 23;
const WEEKLY_MAX = 6;

function ensureVarianceRange(variance: number, max: number) {
  if (variance > max) {
    return variance - max - 1;
  }

  return variance;
}

function foobar(words: string[], intervalOccurences: number, max: number) {
  const delta = Math.floor((max + 1) / intervalOccurences);
  const startingValueRaw = words
    .map((word) => word.replace(/\D/g, ""))
    .map(Number)
    .find((n) => n > 0);
  const startingValue = Math.min(max, Math.max(0, startingValueRaw || 0));
  const result = new Array(intervalOccurences)
    .fill(0)
    .map((_, index) => ensureVarianceRange(index * delta + startingValue, max))
    .sort((a, b) => a - b);
  return result;
}

function mapWordToNumber(word: string, interval: Interval): string {
  const mapped: { [key: string]: number } = intervalIdentifiers[
    interval
  ].reduce((acc, cur, index) => ({ ...acc, [cur]: index }), {});
  return mapped[word]?.toString() || word;
}

function getVariance(
  interval: Interval,
  words: string[],
  intervalOccurences: number
): number[] {
  switch (interval) {
    case Interval.daily:
      return foobar(words, intervalOccurences, DAILY_MAX);
    case Interval.weekly:
      const mappedWords = words.map((word) =>
        mapWordToNumber(word, Interval.weekly)
      );
      return foobar(mappedWords, intervalOccurences, WEEKLY_MAX);
    default:
      return [];
  }
}

function getIntervalIds(
  strippedInput: string,
  intervalOccurences = 1
): [Interval, number[]] | undefined {
  const words = strippedInput.split(" ");
  const foundDailyIds = intervalIdentifiers[Interval.daily].filter((dailyId) =>
    words.find((word) => word === dailyId)
  );
  if (foundDailyIds.length) {
    return [
      Interval.daily,
      getVariance(Interval.daily, words, intervalOccurences),
    ];
  }

  const foundWeeklyIds = intervalIdentifiers[Interval.weekly].filter(
    (dailyId) => strippedInput.includes(dailyId)
  );
  if (foundWeeklyIds.length) {
    return [
      Interval.weekly,
      getVariance(Interval.weekly, words, intervalOccurences),
    ];
  }
}

const pivots: {
  [key: string]: (strippedInput: string) => Schedule | undefined | void;
} = {
  every: (input: string) => {
    const result = getIntervalIds(input);
    if (!result) {
      return;
    }
    const [interval, variance] = result;
    const hasOtherModifier = input.includes("other");
    return {
      id: "test",
      interval,
      variance,
      regularity: hasOtherModifier ? 2 : 1,
    };
  },
  twice: (strippedInput: string) => {
    const result = getIntervalIds(strippedInput, 2);
    if (!result) {
      return;
    }
    const [interval, variance] = result;
    return {
      id: "test",
      interval,
      variance,
      regularity: 1,
    };
  },
  at: () => {},
};

export interface TokenizedResult {
  name: string;
  schedule?: Schedule;
}

export function tokenizeInput(input: string): TokenizedResult {
  const normalizedInput = input.toLowerCase();
  const pivotKeys = Object.keys(pivots);
  const detectedPivot = pivotKeys
    .filter((pivotKey) => normalizedInput.includes(pivotKey))
    .at(0);
  if (!detectedPivot) {
    return { name: input };
  }
  const splitInput = normalizedInput.split(detectedPivot);
  const name = splitInput.at(0)?.trim();
  const strippedInput = detectedPivot + splitInput.at(-1);
  const result = pivots[detectedPivot](strippedInput);

  if (!result || !name) {
    return { name: "none" };
  }
  return { name, schedule: result };
}

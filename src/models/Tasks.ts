import Schedule, { Interval } from "./Schedule";

export interface Task {
  id: string;
  name: string;
  lastCompletionDate?: Date;
}

const modifiers = {
  other: 2,
  second: 2,
  "2nd": 2,
  third: 3,
  "3rd": 3,
  fourth: 4,
  "4th": 4,
  fifth: 5,
  "5th": 5,
};

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
    "month",
  ],
  [Interval.yearly]: ["year"],
};

const DAILY_MAX = 23;
const WEEKLY_MAX = 6;
const MONTHLY_MAX = 27;
const YEARLY_MAX = 11;

function ensureVarianceRange(variance: number, max: number) {
  if (variance > max) {
    return variance - max - 1;
  }

  return variance;
}

function pullNumbers(words: string[]): number[] {
  const result = words
    .map((word) => word.replace(/\D/g, ""))
    .map(Number)
    .filter((n) => n > 0);
  return result;
}

function buildVariances(
  words: string[],
  intervalOccurences: number,
  max: number
) {
  const delta = Math.floor((max + 1) / intervalOccurences);
  const foundVariances = pullNumbers(words);

  if (foundVariances.length > 1) {
    return foundVariances.sort((a, b) => a - b);
  }

  const startingValueRaw = foundVariances.at(0);
  const startingValue = Math.min(max, Math.max(0, startingValueRaw || 0));
  const result = new Array(intervalOccurences)
    .fill(0)
    .map((_, index) => ensureVarianceRange(index * delta + startingValue, max))
    .sort((a, b) => a - b);
  return result;
}

function mapWordToNumber(
  word: string,
  mapped: { [key: string]: string | number }
): string {
  return mapped[word]?.toString() || word;
}

function mapIntervalWordToNumber(word: string, interval: Interval): string {
  const mapped: { [key: string]: number } = intervalIdentifiers[
    interval
  ].reduce((acc, cur, index) => ({ ...acc, [cur]: index }), {});
  return mapWordToNumber(word, mapped);
}

function getVariance(
  interval: Interval,
  words: string[],
  intervalOccurences: number
): number[] {
  switch (interval) {
    case Interval.daily:
      return buildVariances(words, intervalOccurences, DAILY_MAX);
    case Interval.weekly:
      const mappedWords = words.map((word) =>
        mapIntervalWordToNumber(word, Interval.weekly)
      );
      return buildVariances(mappedWords, intervalOccurences, WEEKLY_MAX);
    case Interval.monthly:
      return buildVariances(words, intervalOccurences, MONTHLY_MAX);
    case Interval.yearly:
      return buildVariances(words, intervalOccurences, YEARLY_MAX);
    default:
      return [];
  }
}

function getIntervalIds(
  words: string[],
  intervalOccurences = 1
): [Interval, number[]] | undefined {
  const intervals = Object.keys(Interval) as Interval[];

  for (const interval of intervals) {
    const foundIds = intervalIdentifiers[interval].filter((id) =>
      words.find((word) => word === id)
    );

    if (foundIds.length) {
      return [interval, getVariance(interval, words, intervalOccurences)];
    }
  }
}

const pivots: {
  [key: string]: (strippedInput: string) => Schedule | undefined | void;
} = {
  every: (strippedInput: string) => {
    const words = strippedInput.split(" ");
    const modifier =
      pullNumbers(words.map((w) => mapWordToNumber(w, modifiers))).at(0) ?? 1;
    const allModifiers = Object.keys(modifiers);
    const cleaned = words.filter((w) => !allModifiers.includes(w));
    const result = getIntervalIds(cleaned);
    if (!result) {
      return;
    }
    const [interval, variance] = result;
    return {
      interval,
      variance,
      regularity: modifier,
    };
  },
  twice: (strippedInput: string) => {
    const words = strippedInput.split(" ");
    const result = getIntervalIds(words, 2);
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
  times: () => {},
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

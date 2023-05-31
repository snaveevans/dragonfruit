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

function getIntervalIds(
  strippedInput: string,
  varianceModifier?: number
): [Interval, number[]] | undefined {
  const foundDailyIds = intervalIdentifiers[Interval.daily].filter((dailyId) =>
    strippedInput.includes(dailyId)
  );
  if (foundDailyIds.length) {
    return [Interval.daily, [1 * (varianceModifier || 1)]];
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
  "at the": () => {},
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

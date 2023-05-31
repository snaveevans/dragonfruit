import { Interval } from "../Schedule";
import { tokenizeInput } from "../Tasks";

describe("tokenizeInput", () => {
  test("no occurence detected", () => {
    const input = "make waffles";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: input,
    });
  });

  test("every day", () => {
    const input = "brush teeth every day";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "brush teeth",
      schedule: {
        interval: Interval.daily,
        variance: [1],
        regularity: 1,
      },
    });
  });

  test("every other day", () => {
    const input = "floss teeth every other day";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "floss teeth",
      schedule: {
        interval: Interval.daily,
        variance: [1],
        regularity: 2,
      },
    });
  });

  test("twice a day", () => {
    const input = "pray twice a day";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "pray",
      schedule: {
        interval: Interval.daily,
        variance: [2],
        regularity: 1,
      },
    });
  });
});

// brush teeth every day
// every day
  // interval: daily
  // variance: [1]
  // regularity: 1

// floss teeth every other day
// every other day
  // interval: daily
  // variance: [1]
  // regularity: 2

// pray twice a day 
// bi-daily (2 times a day)
  // interval: daily
  // variance: [2]
  // regularity: 1

// take out trash every monday
// every monday
  // interval: weekly
  // variance: [2]
  // regularity: 1

// watch conference twice a year
// bi-annually (2 times a year)
  // interval: yearly | monthly
  // variance: [1, 182] | [1]
  // regularity: 1 | 6

// refinish the deck every other year
// every other year
  // interval: yearly
  // variance: [1]
  // regularity: 2

// change car oil every quarter
// every quarter
  // interval: monthly
  // variance: [1]
  // regularity: 3

// eat pizza every other friday
// every other friday
  // interval: weekly
  // variance: [6]
  // regularity: 2

// change furnace filter at the first of every month
// first of every month
  // interval: monthly
  // variance: [1]
  // regularity: 1

// make waffles every 3rd Sunday
// every 3rd sunday
  // interval: monthly
  // variance: [21] // doesn't quite work
  // regularity: 1

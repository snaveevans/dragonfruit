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
        variance: [0],
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
        variance: [0],
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
        variance: [0, 12],
        regularity: 1,
      },
    });
  });

  test("twice a day starting at", () => {
    const input = "pray twice a day starting at 8";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "pray",
      schedule: {
        interval: Interval.daily,
        variance: [8, 20],
        regularity: 1,
      },
    });
  });

  test("twice a day starting at high", () => {
    const input = "pray twice a day starting at 18";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "pray",
      schedule: {
        interval: Interval.daily,
        variance: [6, 18],
        regularity: 1,
      },
    });
  });

  test("every monday", () => {
    const input = "take out trash every monday";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "take out trash",
      schedule: {
        interval: Interval.weekly,
        variance: [1],
        regularity: 1,
      },
    });
  });

  test("every tuesday & friday", () => {
    const input = "work out every tuesday & friday";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "work out",
      schedule: {
        interval: Interval.weekly,
        variance: [2, 5],
        regularity: 1,
      },
    });
  });

  test("every other week", () => {
    const input = "eat pizza every other friday";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "eat pizza",
      schedule: {
        interval: Interval.weekly,
        variance: [5],
        regularity: 2,
      },
    });
  });

  test("every 3rd week", () => {
    const input = "eat out every 3rd saturday";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "eat out",
      schedule: {
        interval: Interval.weekly,
        variance: [6],
        regularity: 3,
      },
    });
  });

  test("every month", () => {
    const input = "run 5 miles every month";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "run 5 miles",
      schedule: {
        interval: Interval.monthly,
        variance: [0],
        regularity: 1,
      },
    });
  });

  test("every other year", () => {
    const input = "refinish the deck every other year";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "refinish the deck",
      schedule: {
        interval: Interval.yearly,
        variance: [0],
        regularity: 2,
      },
    });
  });

  test("twice a year", () => {
    const input = "watch conference twice a year";
    const result = tokenizeInput(input);
    expect(result).toMatchObject({
      name: "watch conference",
      schedule: {
        interval: Interval.yearly,
        variance: [0, 6],
        regularity: 1,
      },
    });
  });
});

// change car oil every quarter
// every quarter
  // interval: monthly
  // variance: [1]
  // regularity: 3

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

// clean out garage 5 times a year
// 5 times a year
  // interval: yearly
  // variance: [0, 73, 146, 219, 292]
  // regularity: 1

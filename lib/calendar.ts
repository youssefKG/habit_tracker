import { Activity, DayIndex } from "@/types/activity";
import {
  getDay,
  parseISO,
  subWeeks,
  nextDay,
  eachDayOfInterval,
  differenceInCalendarDays,
  formatISO,
} from "date-fns";

export const groupsByWeeks = (
  activities: Array<Activity>,
  weekStart: DayIndex,
) => {
  const normalizedActivities = fillHoles(activities);
  const firstActivity = activities[0];
  const firstDate = parseISO(firstActivity.date);
  const firstCalendarDate =
    getDay(firstDate) === weekStart
      ? getDay(firstDate)
      : subWeeks(nextDay(firstDate, weekStart), 1);
  const paddedActivities = [
    ...(Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined,
    ) as Array<Activity>),
    ...normalizedActivities,
  ];

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7);
  return range(numberOfWeeks).map((weekIndex) =>
    paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7),
  );
};

const fillHoles = (activities: Array<Activity>) => {
  const calendar = new Map<string, Activity>(
    activities.map((a) => [a.date, a]),
  );
  const firstActivity = activities[0] as Activity;
  const lastActivity = activities[activities.length - 1] as Activity;

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" });
    if (calendar.has(date)) {
      return calendar.get(date);
    }
    return {
      date,
      level: 0,
      count: 0,
    };
  });
};

const range = (n: number) => {
  return [...Array(n).keys()];
};

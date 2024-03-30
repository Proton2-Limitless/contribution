import { addDays, addMonths, addYears, addWeeks } from "date-fns";

const convertIntervalToDate = (period: string) => {
  const match = period.match(
    /^(\d+) (MONTH|WEEK|YEAR|DAY|month|week|year|day)$/
  );

  if (!match) return;

  const unitOffset = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  let targetDateTime = new Date();

  if (unit === "week") {
    targetDateTime = addWeeks(targetDateTime, unitOffset);
  } else if (unit === "month") {
    targetDateTime = addMonths(targetDateTime, unitOffset);
  } 
  // else if (unit === "year") {
  //   targetDateTime = addYears(targetDateTime, unitOffset);
  // } else if (unit === "day") {
  //   targetDateTime = addDays(targetDateTime, unitOffset);
  // }
  console.log(targetDateTime)
  return targetDateTime;
};

export default convertIntervalToDate;
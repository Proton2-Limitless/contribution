import { addDays, addMonths, addYears, addWeeks } from "date-fns";
import { FieldHook } from "payload/types";

const convertPeriodToTenure = (period: string) => {
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
  } else if (unit === "year") {
    targetDateTime = addYears(targetDateTime, unitOffset);
  } else if (unit === "day") {
    targetDateTime = addDays(targetDateTime, unitOffset);
  }

  return targetDateTime;
};

export const startDate: FieldHook = async ({ operation, data, value }) => {
  if (operation === "create") {
    value = convertPeriodToTenure(data?.startDate);
  }
  return value;
};

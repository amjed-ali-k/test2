
import { useEffect, useState } from "react";
import { differenceInSeconds, format, intervalToDuration } from "date-fns";

export function FormattedTime({ date }: { date?: Date | null | string }) {
  if (!date) return <span>N/A</span>;
  const _date = new Date(date);
  return <span>{format(_date, "hh:mm")}</span>;
}

const remainingTime = (targetDate: Date) => {
  const now = new Date();
  const diff = differenceInSeconds(targetDate.toISOString(), now.toISOString());
  if (diff < 0) return "00:00:00";
  const duration = intervalToDuration({ start: 0, end: diff * 1000 });
  return `${duration.hours ? String(duration.hours).padStart(2, "0") : "00"}:${
    duration.minutes ? String(duration.minutes).padStart(2, "0") : "00"
  }:${duration.seconds ? String(duration.seconds).padStart(2, "0") : "00"}`;
};

export function RemainingTime({ to }: { to?: Date }) {
  const _to = to ? new Date(to) : new Date();
  const [time, setTime] = useState(remainingTime(_to));

  useEffect(() => {
    const t = setInterval(() => {
      setTime(remainingTime(_to));
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, [_to]);

  // if (time === "00:00:00") return null;

  return <>{time}</>;
}

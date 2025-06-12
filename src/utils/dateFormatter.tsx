import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

export const formatHari = (isoDate: string) => {
  return dayjs(isoDate).format("dddd, D MMMM YYYY");
};

export const formatJam = (start: string, end: string) => {
  if (!start || !end) return "Jam tidak tersedia";

  const startTime = dayjs(start, "HH:mm:ss");
  const endTime = dayjs(end, "HH:mm:ss");

  if (!startTime.isValid() || !endTime.isValid()) {
    return "Invalid Date";
  }

  return `${startTime.format("HH:mm")} - ${endTime.format("HH:mm")}`;
};

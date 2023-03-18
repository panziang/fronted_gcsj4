import dayjs from "dayjs";

//设置默认格式化形式
export function formatMonthDay (date,formatStr="MM月DD日") {
  return dayjs(date).format(formatStr)
}

export function getDiffDays (startDate, endDate) {
  return dayjs(endDate).diff(startDate,"day")
}
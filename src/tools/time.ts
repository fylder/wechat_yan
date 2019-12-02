//2019-07-07T19:02:37.000Z
export const getDate = (timeStr: string): string => {
  var date = new Date(timeStr);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

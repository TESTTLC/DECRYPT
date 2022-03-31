export const addMinutesToCurrentDateTime = (minutes: number) => {
  const now = new Date();
  return now.getTime() + minutes * 60 * 1000;
};

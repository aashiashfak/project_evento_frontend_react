export const convert24To12Hour = (time) => {
  const [hour, minute, second] = time.split(":");
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
};

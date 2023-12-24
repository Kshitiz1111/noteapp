export const formatDate = (
  timestamp: number,
  locale: string = "en-US"
): string => {
  console.log(typeof timestamp, timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;
  console.log(typeof diff, diff);
  // Calculate time differences in various units

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  console.log(typeof seconds, seconds);
  // Choose and format based on the largest relevant unit
  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    // Ensure return statement even when all conditions fail
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

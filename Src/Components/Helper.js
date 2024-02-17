// Get the current date, month, and year.........................................
const currentDate = new Date();
export const date = currentDate.getDate(); // Get the day of the month (1-31)
const month = currentDate.getMonth(); // Get the month (0-11). Adding 1 because months are zero-indexed
export const year = currentDate.getFullYear(); // Get the four-digit year
const day = currentDate.getDay();
const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayOfWeek = dayOfWeekNames[day];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthOfYear = monthNames[month];
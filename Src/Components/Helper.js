// Get the current date, month, and year.........................................
const currentDate = new Date();
export const date = currentDate.getDate(); // Get the day of the month (1-31)
export const month = currentDate.getMonth()+1; // Get the month (0-11). Adding 1 because months are zero-indexed
export const year = currentDate.getFullYear(); // Get the four-digit year
const day = currentDate.getDay();
const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const dayOfWeek = dayOfWeekNames[day];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const monthOfYear = monthNames[month-1];
const numberOfDaysInMonth={January:31,February:28,March:31,April:30,May:31,June:30,July:31,August:31,September:30,October:31,November:30,December:31};

export const indexOfMonth=(monthName)=>{
    for(i=0;i<12;i++)
    {
        if(monthNames[i]==monthName)
            return i;
        
    }
}
export const monthnameOfYear=(month)=>{
    return monthNames[month];
}
export const daynameOfWeek=(day)=>{
    return dayOfWeekNames[day];
}
export const indexOfDay=(dayName)=>
{
    for(i=0;i<7;i++)
    {
        if(dayOfWeekNames[i]==dayName)
                return i;
    }
}
export const daysOfMonth=(month,year)=>
{
    if(month=='February')
    {
        if(year%4==0)
            return 29;
        else
            return 28;
    }
    return numberOfDaysInMonth[month];
}

//used to call on days display as per month
export const daysOfMonthData=(currentMonth,currentYear)=>{
    console.log(currentMonth);
    const numberOfDays=daysOfMonth(currentMonth,currentYear);
    const monthindex=(indexOfMonth(currentMonth)+1)
    const data=[];
    for(i=1;i<=numberOfDays;i++)
    {
        const dateString=new Date(`${currentYear}-${monthindex}-${i}`);
        const dayOfWeek=dayOfWeekNames[dateString.getDay()];
        data.push({date:i,day:dayOfWeek,amount:0.00})
        // this condtion for the current year and month to display days until today
        if(currentYear==year && monthindex==month)
        {
            if(i==date)
                break;
        }
    }
   
    return data;
}
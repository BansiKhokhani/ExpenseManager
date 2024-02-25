import { UPDATE_SELECTED_DATE_MONTH_YEAR } from "./actionTypes";


export const updateselected_Date_Month_Year=(selectedDate, selectedDay, selectedMonth, selectedYear)=>({
        type: UPDATE_SELECTED_DATE_MONTH_YEAR,
        payload:{
                selectedDate,
                selectedDay,
                selectedMonth,
                selectedYear
              }
    
   
})
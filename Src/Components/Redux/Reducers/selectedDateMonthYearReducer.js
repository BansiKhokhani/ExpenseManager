// it is used to handle screen compunication to store temporary data
import { UPDATE_SELECTED_DATE_MONTH_YEAR } from "../actionTypes";
import { dayOfWeek, date, monthOfYear, year } from '../../Helper'

const initialState = {
    selectedDate:date,
    selectedDay:dayOfWeek,
    selectedMonth:monthOfYear,
    selectedYear:year,
  };

  export const selectedDateMonthYearReducer=(state = initialState, action)=>{
    //console.log("....."+action)
    switch (action.type) {
        case UPDATE_SELECTED_DATE_MONTH_YEAR:
          return {
            ...state,
            selectedDate: action.payload.selectedDate,
            selectedDay: action.payload.selectedDay,
            selectedMonth: action.payload.selectedMonth,
            selectedYear: action.payload.selectedYear
          };
        default:
          return state;
      }
  };



import { UPDATE_CURRENT_DATE_MONTH_YEAR } from "./actionTypes";


export const updateCurrent_Date_Month_Year=(data)=>{
    return {
        type:UPDATE_CURRENT_DATE_MONTH_YEAR,
        payload:data,
    }
}
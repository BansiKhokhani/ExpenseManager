import { UPDATE_SELECTED_DATE_MONTH_YEAR, ADD_EXPENSE,ADD_INCOME,DELETE_EXPENSE,DELETE_INCOME, UPDATE_EXPENSE, UPDATE_INCOME } from "./actionTypes";



export const updateselected_Date_Month_Year = (selectedDate, selectedDay, selectedMonth, selectedYear) => ({
        type: UPDATE_SELECTED_DATE_MONTH_YEAR,
        payload: {
                selectedDate,
                selectedDay,
                selectedMonth,
                selectedYear
        }


});

export const addExpense = (year, month, date, expense) => {
        return {
                type: ADD_EXPENSE,
                payload: {
                        year,
                        month,
                        date,
                        expense
                }
        }
}

export const addIncome= (year, month, date, income) => {
        return {
                type: ADD_INCOME,
                payload: {
                        year,
                        month,
                        date,
                        income
                }
        }
}

export const deleteExpense=(year, month, date,uniqueId)=>{
       
        return{
                type:DELETE_EXPENSE,
                payload:{year, month, date,uniqueId}
        }
}

export const deleteIncome=(year,month,date,uniqueId)=>{
        return {
                type:DELETE_INCOME,
                payload:{year, month, date,uniqueId}
        }
}

export const updateExpense=(year,month,date,data)=>{
        return{
                type:UPDATE_EXPENSE,
                payload:{year, month, date,data}
        }
}

export const updateIncome=(year,month,date,data)=>{
        return{
                type:UPDATE_INCOME,
                payload:{year, month, date,data}
        }
}
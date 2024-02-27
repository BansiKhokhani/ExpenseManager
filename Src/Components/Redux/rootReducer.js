import { combineReducers } from "redux";
import {selectedDateMonthYearReducer} from "./Reducers/selectedDateMonthYearReducer";
import { expenseReducer} from "./Reducers/expenseReducer";
import { incomeReducer } from "./Reducers/incomeReducer";


export default combineReducers({
    selectedDateMonthYearReducer,
    expenseReducer,
    incomeReducer
});


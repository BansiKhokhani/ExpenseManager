import { combineReducers } from "redux";
import currentDateMonthYearReducer from "./Reducers/currentDateMonthYearReducer";

const  rootReducers=combineReducers({
    cureentDateMonthYear:currentDateMonthYearReducer,
});

export default rootReducers;
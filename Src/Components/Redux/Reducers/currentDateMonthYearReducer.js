// it is used to handle screen compunication to store temporary data
import { UPDATE_CURRENT_DATE_MONTH_YEAR } from "../actionTypes";

const initialState = {
  };

  const currentDateMonthYearReducer=(state = initialState, action)=>{

        switch(action.type)
        {
            case UPDATE_CURRENT_DATE_MONTH_YEAR:
                return{
                    ...state,
                    date:action.payload.date,
                    day:action.payload.day,
                    month:action.payload.month,
                    year:action.payload.year
                }

            default:
                return state;
        }
  }

  export default currentDateMonthYearReducer;

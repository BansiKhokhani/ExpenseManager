import { ADD_INCOME, DELETE_INCOME } from "../actionTypes";
const initialData = {

}

export const incomeReducer = (state = initialData, action) => {
    switch (action.type) {
        case ADD_INCOME:
            const { year, month, date, income } = action.payload;
            return {
                ...state,
                [year]: {
                    ...state[year],
                    [month]: {
                        ...state[year]?.[month],
                        [date]: [...(state[year]?.[month]?.[date] || []), income]
                    }
                }
            };
            case DELETE_INCOME:
                const { year: deleteYear, month: deleteMonth, date: deleteDate, uniqueId: deleteId } = action.payload;
                if (state[deleteYear]?.[deleteMonth]?.[deleteDate]) {
                    const updatedDay = state[deleteYear][deleteMonth][deleteDate].filter(item => item.uniqueId !== deleteId);
                    return {
                        ...state,
                        [deleteYear]: {
                            ...state[deleteYear],
                            [deleteMonth]: {
                                ...state[deleteYear]?.[deleteMonth],
                                [deleteDate]: updatedDay
                            }
                        }
                    };
                }

        default:
            return state;
    }
}
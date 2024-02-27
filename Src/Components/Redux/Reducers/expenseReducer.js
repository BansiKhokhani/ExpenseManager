import { ADD_EXPENSE, DELETE_EXPENSE } from "../actionTypes";
const initialData = {

}

export const expenseReducer = (state = initialData, action) => {
    switch (action.type) {
        case ADD_EXPENSE:
            const { year, month, date, expense } = action.payload;
            return {
                ...state,
                [year]: {
                    ...state[year],
                    [month]: {
                        ...state[year]?.[month],
                        [date]: [...(state[year]?.[month]?.[date] || []), expense]
                    }
                }
            };

        case DELETE_EXPENSE:
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
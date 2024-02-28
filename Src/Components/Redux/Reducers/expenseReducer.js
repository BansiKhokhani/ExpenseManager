import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from "../actionTypes";
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
                const deleteItem = state[deleteYear][deleteMonth][deleteDate].filter(item => item.uniqueId !== deleteId);
                return {
                    ...state,
                    [deleteYear]: {
                        ...state[deleteYear],
                        [deleteMonth]: {
                            ...state[deleteYear]?.[deleteMonth],
                            [deleteDate]: deleteItem
                        }
                    }
                };
            }
        case UPDATE_EXPENSE:
            const { year: fYear, month: fMonth, date: fDate, data: fData } = action.payload;
            const updateItem = state[fYear][fMonth][fDate].map(item => {
                if (item.uniqueId == fData?.uniqueId)
                    return fData;
                return item;
            });
            return {
                ...state,
                [fYear]: {
                    ...state[fYear],
                    [fMonth]: {
                        ...state[fYear]?.[fMonth],
                        [fDate]: updateItem
                    }
                }
            };
        default:
            return state;
    }
}
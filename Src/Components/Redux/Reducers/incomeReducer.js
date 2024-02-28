import { ADD_INCOME, DELETE_INCOME, UPDATE_INCOME } from "../actionTypes";
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
        case UPDATE_INCOME:
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
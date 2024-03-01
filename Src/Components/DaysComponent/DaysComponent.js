import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import { EXPENSE } from '../constants';
import { convertToNormalNumber } from '../Helper'

const DaysComponent = ({ item, isPress, isIncomeOrExpense }) => {
    const dispatch = useDispatch();
    const { selectedDate, selectedDay, selectedMonth, selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)
    const [amount, setamount] = useState(0.00);
    const expenseData = useSelector(state => state.expenseReducer);
    const incomeData = useSelector(state => state.incomeReducer);


   

    const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
        dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
    }
    const AddNewItem = () => (
        isPress(true),
        handleDispatch(item.date, item.day, selectedMonth, selectedYear)
    )

    const handletotalCalculation = (incomeExpenseData) => {
        let totalexpense = 0;
        const data = incomeExpenseData?.[selectedYear]?.[selectedMonth]?.[item.date];
        data?.filter(item => {
            totalexpense += convertToNormalNumber(item?.inputPrice);
        })
        return totalexpense>0?(parseFloat(totalexpense, 10)).toLocaleString(undefined, { minimumFractionDigits: 2 }):null;
    }


    return (
        <TouchableOpacity activeOpacity={1} onPress={AddNewItem} style={{ marginHorizontal: 15, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.date} - </Text><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.day}</Text></View>
                <View>
                     <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{isIncomeOrExpense==EXPENSE?(handletotalCalculation(expenseData)||''):(handletotalCalculation(incomeData)||'')}</Text>
                </View>
            </View>
            <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
        </TouchableOpacity>
    )
}

export default DaysComponent;

import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import { CALENDER_YEAR_MONTH, EXPENSE, REPORT_CALENDER_YEAR_MONTH } from '../constants';
import { convertToNormalNumber } from '../Helper'

const DaysComponent = ({ page, item, isPress, isIncomeOrExpense }) => {
    const dispatch = useDispatch();
    const { selectedDate, selectedDay, selectedMonth, selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)
    const [amount, setamount] = useState(0.00);
    const expenseData = useSelector(state => state.expenseReducer);
    const incomeData = useSelector(state => state.incomeReducer);
    const [currentFont, setCurrentFont] = useState(15);

    // used to change the font size when item(date) chamges
    useEffect(()=>{
        setCurrentFont(15);
    },[item])

    const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
        dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
    }
    const AddNewItem = () => (
        isPress(true),
        handleDispatch(item.date, item.day, selectedMonth, selectedYear)
    )

    const presstoGoOnCalendar=()=>{
        handleDispatch(item.date, item.day, selectedMonth, selectedYear)
        isPress(true);
        
    }

    const handletotalCalculation = (incomeExpenseData) => {
        let totalexpense = 0;
        const data = incomeExpenseData?.[selectedYear]?.[selectedMonth]?.[item.date];
        data?.filter(item => {
            totalexpense += convertToNormalNumber(item?.inputPrice);
        })
        return totalexpense > 0 ? (parseFloat(totalexpense, 10)).toLocaleString(undefined, { minimumFractionDigits: 2 }) : null;
    }


    return (
        <>
            {page == CALENDER_YEAR_MONTH && <TouchableOpacity activeOpacity={1} onPress={AddNewItem} style={{ marginHorizontal: 15, marginVertical: 5 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.date} - </Text><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.day}</Text></View>
                    <View>
                        <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{isIncomeOrExpense == EXPENSE ? (handletotalCalculation(expenseData) || '') : (handletotalCalculation(incomeData) || '')}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
            </TouchableOpacity>}
            {
                page == REPORT_CALENDER_YEAR_MONTH &&
                <TouchableOpacity activeOpacity={1} onPress={presstoGoOnCalendar}>
                    <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                        <View style={{ flex: 0.2 }}><Text style={{ color: Colors.whitetextcolor }}>{item?.date}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', color: Colors.whitetextcolor, fontSize: currentFont }} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{handletotalCalculation(incomeData) || '0.00'}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', color: Colors.whitetextcolor, fontSize: currentFont }} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{handletotalCalculation(expenseData) || '0.00'}</Text></View>
                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right', color: Colors.whitetextcolor, fontSize: currentFont }} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{(handletotalCalculation(incomeData) - handletotalCalculation(expenseData)) || '0.00'}</Text></View>
                    </View>
                    <View style={{ borderWidth: 0.2, borderColor: Colors.whitetextcolor }} />
                </TouchableOpacity>
            }
        </>
    )
}

export default DaysComponent;

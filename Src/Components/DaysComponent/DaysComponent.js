import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import { CALENDER_YEAR_MONTH, EXPENSE, REPORT_CALENDER_YEAR_MONTH } from '../constants';
import { convertToNormalNumber } from '../Helper'

const DaysComponent = ({ page, item, isPress, isIncomeOrExpense }) => {
    const dispatch = useDispatch();
    const {selectedMonth, selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)   // get and store selected month and year
    const expenseData = useSelector(state => state.expenseReducer);                                   // get expense data
    const incomeData = useSelector(state => state.incomeReducer);                                     // get income data
    const [currentFont, setCurrentFont] = useState(15);                                                 

    // used to change the font size when item(date) chamges
    useEffect(()=>{
        setCurrentFont(15);
    },[item])

    const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
        dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
    }

    // call on button press (CALENDER_YEAR_MONTH)
    const AddNewItem = () => (
        isPress(true),
        handleDispatch(item.date, item.day, selectedMonth, selectedYear)
    )

    // call on button press (REPORT_CALENDER_YEAR_MONTH)
    const presstoGoOnCalendar=()=>{
        handleDispatch(item.date, item.day, selectedMonth, selectedYear)
        isPress(true);
        
    }

    // handle total calulation of one day
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
            {page == CALENDER_YEAR_MONTH && 
            // Display: 01 - Monday           0.00
            <TouchableOpacity activeOpacity={1} onPress={AddNewItem} style={styles.touchableOpacity}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.dateView}><Text style={styles.dateNameText}>{item.date} - </Text><Text style={styles.dateNameText}>{item.day}</Text></View>
                    <View>
                        <Text style={styles.dateNameText}>{isIncomeOrExpense == EXPENSE ? (handletotalCalculation(expenseData) || '') : (handletotalCalculation(incomeData) || '')}</Text>
                    </View>
                </View>
                <View style={styles.calendarYearMonthLine}></View>
            </TouchableOpacity>}
            {page == REPORT_CALENDER_YEAR_MONTH &&
            // Display :  1(date)    0.00(INCOME)    0.00(EXPENSE)     0.00(TOTAL)
                <TouchableOpacity activeOpacity={1} onPress={presstoGoOnCalendar}>
                    <View style={styles.reportCalanderYearMonthMainView}>
                        <View style={{ flex: 0.2 }}><Text style={{ color: Colors.whitetextcolor }}>{item?.date}</Text></View>
                        <View style={{ flex: 1 }}><Text style={[styles.text,{ fontSize: currentFont }]} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{handletotalCalculation(incomeData) || '0.00'}</Text></View>
                        <View style={{ flex: 1 }}><Text style={[styles.text,{ fontSize: currentFont }]} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{handletotalCalculation(expenseData) || '0.00'}</Text></View>
                        <View style={{ flex: 1 }}><Text style={[styles.text,{ fontSize: currentFont }]} adjustsFontSizeToFit={true} onTextLayout={(e) => {
                            const { lines } = e.nativeEvent;
                            if (lines.length > 1) {
                                setCurrentFont(currentFont - 1);
                            }
                        }}>{(handletotalCalculation(incomeData) - handletotalCalculation(expenseData)) || '0.00'}</Text></View>
                    </View>
                    <View style={styles.reportCalanderYearMonthBorder} />
                </TouchableOpacity>
            }
        </>
    )
}
const styles=StyleSheet.create({
touchableOpacity: {marginHorizontal: 15, marginVertical: 5 },
dateNameText:{ color: Colors.whitetextcolor, fontWeight: 'bold' },
dateView:{ flex: 1, flexDirection: 'row' },
calendarYearMonthLine:{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 },
text:{ textAlign: 'right', color: Colors.whitetextcolor},
reportCalanderYearMonthMainView:{ flexDirection: 'row', marginVertical: 10 },
reportCalanderYearMonthBorder:{ borderWidth: 0.2, borderColor: Colors.whitetextcolor },
})
export default DaysComponent;

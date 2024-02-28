import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import { EXPENSE } from '../constants';


const MonthComponent = ({ monthName, isIncomeOrExpense,isPress }) => {
  const dispatch = useDispatch();
  const { selectedDate, selectedDay,  selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)
  const expenseData = useSelector(state => state.expenseReducer);
  const incomeData = useSelector(state => state.incomeReducer);

  const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
    dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
  }

  const showMonthAllDays = () => (
    handleDispatch(selectedDate, selectedDay, monthName, selectedYear),
    isPress(true)
  );

  const handletotalCalculation = (incomeExpenseData) => {
    let totalexpense = 0;
    const data = incomeExpenseData?.[selectedYear]?.[monthName];
    for (const key in data) {
      data[key]?.filter(item => {
        totalexpense += parseInt(item.inputPrice)
      })
    }

    return (parseFloat(totalexpense)).toFixed(2);
  }


  return (

    <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={{ backgroundColor: '#ffff', paddingHorizontal: 10, paddingTop: 10, width: '45%', borderRadius: 5, margin: 10 }}>
      <View style={{ backgroundColor: Colors.topBottomBarcolor, alignItems: 'center', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 20 }}>{monthName}</Text>
      </View>
      <Text style={{ color: Colors.textcolor, textAlign: 'center', paddingVertical: 5, fontWeight: 'bold' }}>{isIncomeOrExpense==EXPENSE?handletotalCalculation(expenseData):handletotalCalculation(incomeData)}</Text>
    </TouchableOpacity>



  )
}

export default MonthComponent;

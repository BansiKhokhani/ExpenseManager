import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import { CALENDER_YEAR_MONTH, EXPENSE, CALENDER_YEAR, REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH } from '../constants';
import { convertToNormalNumber } from '../Helper'
import TotalIncomeExpenseComponent from '../totalIncomeExpenseComponent/totalIncomeExpenseComponent';

const MonthComponent = ({ page, monthName, isIncomeOrExpense, isPress }) => {
  const dispatch = useDispatch();
  const { selectedDate, selectedDay, selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)
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
        totalexpense += convertToNormalNumber(item?.inputPrice);
      })
    }

    return (parseFloat(totalexpense, 10)).toLocaleString(undefined, { minimumFractionDigits: 2 });
  }


  return (
    <>

      {page === CALENDER_YEAR &&
        <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={{ backgroundColor: '#ffff', paddingHorizontal: 10, paddingTop: 10, width: '45%', borderRadius: 5, margin: 10 }}>
          <View style={{ backgroundColor: Colors.topBottomBarcolor, alignItems: 'center', padding: 10, borderRadius: 5 }}>
            <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 20 }}>{monthName}</Text>
          </View>
          <Text style={{ color: Colors.textcolor, textAlign: 'center', paddingVertical: 5, fontWeight: 'bold' }}>{isIncomeOrExpense == EXPENSE ? handletotalCalculation(expenseData) : handletotalCalculation(incomeData)}</Text>
        </TouchableOpacity>
      }
      {page == REPORT_CALENDER_YEAR &&
         <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={{ backgroundColor: Colors.whitetextcolor, borderRadius: 10,marginVertical:5}}>
         <View style={{ flexDirection: 'row', marginHorizontal: 5 }}>
           <View style={{ backgroundColor: Colors.buttonColor, borderRadius: 10 ,padding:20,alignSelf:'center'}}><Text style={{ color: Colors.whitetextcolor, fontSize: 25, fontWeight: '900' }}>{monthName.substring(0,3)}</Text></View>
           <View style={{flex:1,paddingLeft:10,paddingTop:5}}>
             <TotalIncomeExpenseComponent color={Colors.textcolor} page={REPORT_CALENDER_YEAR_MONTH} selectedMonthName={monthName}/>
           </View>
         </View>
       </TouchableOpacity>
      }

    </>



  )
}

export default MonthComponent;

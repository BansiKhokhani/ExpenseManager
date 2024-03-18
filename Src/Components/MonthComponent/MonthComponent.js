import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Colors from '../Colors';
import { useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';
import {  EXPENSE, CALENDER_YEAR, REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH } from '../constants';
import { convertToNormalNumber } from '../Helper'
import TotalIncomeExpenseComponent from '../totalIncomeExpenseComponent/totalIncomeExpenseComponent';

const MonthComponent = ({ page, monthName, isIncomeOrExpense, isPress }) => {
  const dispatch = useDispatch();
  const { selectedDate, selectedDay, selectedYear } = useSelector(state => state.selectedDateMonthYearReducer)  // store selected year , month and day
  const expenseData = useSelector(state => state.expenseReducer);                                               // store the expense data
  const incomeData = useSelector(state => state.incomeReducer);                                                 // store the income data


  // store current selected month in redux
  const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
    dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
  }

  // call on month button press ( report screen and calendar screen)
  const showMonthAllDays = () => (
    handleDispatch(selectedDate, selectedDay, monthName, selectedYear),
    isPress(true)
  );

  // handle total calculation of income and expense in calendar screen
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
      // Display on calendar screen
        <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={styles.calanderTouchableOpacity}>
          {/* show month name */}
          <View style={styles.calendarYearView}>
            <Text style={styles.monthNameText}>{monthName}</Text>
          </View>
          {/* show month total income or expense */}
          <Text style={styles.amountText}>{isIncomeOrExpense == EXPENSE ? handletotalCalculation(expenseData) : handletotalCalculation(incomeData)}</Text>
        </TouchableOpacity>
      }
      {page == REPORT_CALENDER_YEAR &&
      // display on Report screen
         <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={styles.reportCalendarTouchableOpacity}>
         <View style={styles.reportCalendarYearMainWrapper}>
          {/* show month name */}
           <View style={styles.monthNameTextView}><Text style={styles.reportCalendarMonthNameText}>{monthName.substring(0,3)}</Text></View>
           {/* income expense showcase */}
           <View style={styles.totalIncomeExpenseComponentView}>
             <TotalIncomeExpenseComponent color={Colors.textcolor} page={REPORT_CALENDER_YEAR_MONTH} selectedMonthName={monthName}/>
           </View>
         </View>
       </TouchableOpacity>
      }

    </>



  )
}
const styles=StyleSheet.create({
calanderTouchableOpacity:{ backgroundColor: Colors.whitetextcolor, paddingHorizontal: 10, paddingTop: 10, width: '45%', borderRadius: 5, marginVertical: 10},
calendarYearView:{ backgroundColor: Colors.topBottomBarcolor, alignItems: 'center', padding: 10, borderRadius: 5 },
monthNameText:{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 20 },
amountText:{ color: Colors.textcolor, textAlign: 'center', paddingVertical: 5, fontWeight: 'bold' },
reportCalendarTouchableOpacity:{ backgroundColor: Colors.whitetextcolor, borderRadius: 10,marginVertical:5},
reportCalendarYearMainWrapper:{ flexDirection: 'row', marginHorizontal: 5 },
monthNameTextView:{ backgroundColor: Colors.buttonColor, borderRadius: 10 ,padding:20,alignSelf:'center'},
totalIncomeExpenseComponentView:{flex:1,paddingLeft:10,paddingTop:5},
reportCalendarMonthNameText:{ color: Colors.whitetextcolor, fontSize: 25, fontWeight: '900' },
})
export default MonthComponent;

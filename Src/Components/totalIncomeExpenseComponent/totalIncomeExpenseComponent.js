import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
import {INCOME, EXPENSE, TOTAL, REPORT_CALENDER_YEAR_MONTH } from '../../Components/constants'
import { useSelector} from 'react-redux'
import { convertToLocalString, convertToNormalNumber } from '../../Components/Helper'

const TotalIncomeExpenseComponent=({color,page,selectedMonthName})=>{
  const {selectedYear} = useSelector(state => state.selectedDateMonthYearReducer) // get the selected year
  const expenseData = useSelector(state => state.expenseReducer); // get and store expense data 
  const incomeData = useSelector(state => state.incomeReducer);  // get and store income data


// return total income or expense of specified month of the year or specified year
  const handletotalCalculation = (incomeExpenseData) => {
    let totalexpense = 0;

    if (page===REPORT_CALENDER_YEAR_MONTH) {
      const data = incomeExpenseData?.[selectedYear]?.[selectedMonthName];
      for (const key in data) {
        data[key]?.filter(item => {
          totalexpense += convertToNormalNumber(item?.inputPrice);
        })
      }
    }
    else {
      const data = incomeExpenseData?.[selectedYear];
      for (const key in data) {
        for (const dateKey in data[key]) {
          data[key][dateKey]?.filter(item => {
            totalexpense += convertToNormalNumber(item?.inputPrice);
          })
        }

      }

    }
    return totalexpense;
  }

  return (
    <View>
          <View style={styles.mainView}>
            {/* Display : INCOME                0.00 */}
            <View style={{flex:1}}><Text style={[styles.text,{color:color}]}>{INCOME}</Text></View>
            <View><Text style={[styles.text,{color:color}]}>{convertToLocalString(handletotalCalculation(incomeData))}</Text></View>
          </View>
          {/* Display : EXPENSE                0.00 */}
          <View style={styles.mainView}>
            <View style={{flex:1}}><Text style={[styles.text,{color:color}]}>{EXPENSE}</Text></View>
            <View><Text style={[styles.text,{color:color}]}>{convertToLocalString(handletotalCalculation(expenseData))}</Text></View>
          </View>
          {/* Display :________________________________ */}
          <View style={[styles.border,{borderColor:color}]}/>
          {/* Display : TOTAL                0.00 */}
          <View style={[styles.mainView,{marginBottom:10}]}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'900'}}>{TOTAL}</Text></View>
            <View><Text style={{color:color,fontWeight:'900'}}>{convertToLocalString(handletotalCalculation(incomeData)-handletotalCalculation(expenseData))}</Text></View>
          </View>
    </View>
  )
}
const styles=StyleSheet.create({
  mainView:{flexDirection:'row',marginBottom:5},
  text:{fontWeight:'bold'},
  border:{borderWidth:0.6,marginBottom:5},

})
export default TotalIncomeExpenseComponent

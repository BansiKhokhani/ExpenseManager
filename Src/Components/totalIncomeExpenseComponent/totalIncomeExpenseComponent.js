import React,{useState} from 'react'
import {View,Text} from 'react-native';
import Colors from '../../Constants/Colors'
import {INCOME, EXPENSE, TOTAL, REPORT_CALENDER_YEAR_MONTH } from '../../Components/constants'
import { useSelector, useDispatch } from 'react-redux'
import { convertToLocalString, convertToNormalNumber } from '../../Components/Helper'

const TotalIncomeExpenseComponent=({color,page,selectedMonthName})=>{
  const {selectedYear,selectedMonth} = useSelector(state => state.selectedDateMonthYearReducer)
  const expenseData = useSelector(state => state.expenseReducer);
  const incomeData = useSelector(state => state.incomeReducer);



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

const handleTotalExpenceIncome=()=>{
  const expense=handletotalCalculation(expenseData);
  const income=handletotalCalculation(incomeData);
  const total=income-expense;
  return {income,expense,total}
}
  return (
    <View>
          <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'bold'}}>{INCOME}</Text></View>
            <View><Text style={{color:color,fontWeight:'bold'}}>{convertToLocalString(handletotalCalculation(incomeData))}</Text></View>
          </View>
          <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'bold'}}>{EXPENSE}</Text></View>
            <View><Text style={{color:color,fontWeight:'bold'}}>{convertToLocalString(handletotalCalculation(expenseData))}</Text></View>
          </View>
          <View style={{borderWidth:0.6,borderColor:color,marginBottom:5}}/>
          <View style={{flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'900'}}>{TOTAL}</Text></View>
            <View><Text style={{color:color,fontWeight:'900'}}>{convertToLocalString(handletotalCalculation(incomeData)-handletotalCalculation(expenseData))}</Text></View>
          </View>
    </View>
  )
}

export default TotalIncomeExpenseComponent

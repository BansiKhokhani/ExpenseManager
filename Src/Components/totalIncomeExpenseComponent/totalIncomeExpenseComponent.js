import React from 'react'
import {View,Text} from 'react-native';
import Colors from '../../Constants/Colors'
import {INCOME, EXPENSE, TOTAL } from '../../Components/constants'

const TotalIncomeExpenseComponent=({color})=>{
  return (
    <View>
          <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'bold'}}>{INCOME}</Text></View>
            <View><Text style={{color:color,fontWeight:'bold'}}>0.00</Text></View>
          </View>
          <View style={{flexDirection:'row',marginBottom:5}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'bold'}}>{EXPENSE}</Text></View>
            <View><Text style={{color:color,fontWeight:'bold'}}>0.00</Text></View>
          </View>
          <View style={{borderWidth:0.6,borderColor:color,marginBottom:5}}/>
          <View style={{flexDirection:'row',marginBottom:10}}>
            <View style={{flex:1}}><Text style={{color:color,fontWeight:'900'}}>{TOTAL}</Text></View>
            <View><Text style={{color:color,fontWeight:'900'}}>0.00</Text></View>
          </View>
    </View>
  )
}

export default TotalIncomeExpenseComponent

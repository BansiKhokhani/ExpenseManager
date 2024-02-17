import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY } from '../../Components/constants';
import { dayOfWeek ,date,monthOfYear,year, } from '../../Components/Helper';

export default function Calender() {

  const data = [
    { id: '1', monthName: 'January', amount: '0.00' },
    { id: '2', monthName: 'February', amount: '0.00' },
    { id: '3', monthName: 'March', amount: '0.00' },
    { id: '4', monthName: 'April', amount: '0.00' },
    { id: '5', monthName: 'May', amount: '0.00' },
    { id: '6', monthName: 'June', amount: '0.00' },
    { id: '7', monthName: 'July', amount: '0.00' },
    { id: '8', monthName: 'August', amount: '0.00' },
    { id: '9', monthName: 'September', amount: '0.00' },
    { id: '10', monthName: 'October', amount: '0.00' },
    { id: '11', monthName: 'November', amount: '0.00' },
    { id: '12', monthName: 'December', amount: '0.00' },
  ];

  const renderItem = ({ item }) => (
    <MonthComponent monthName={item.monthName} amount={item.amount} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackgroundColor }}>
      <Header page={CALENDER_YEAR_MONTH} data={{date: date, month: monthOfYear, year: year, day: dayOfWeek }}></Header>
      <View style={{ flex: 1, marginTop: 5 }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  },
  itemContainer: {
    width: '50%', // 50% -> 2 columns | 33% -> 3 columns | 25% -> 4 columns
    height: '100px'
  },
  item: {
    padding: '8px',
    margin: '8px',
    backgroundColor: '#EEEEEE',
    height: "calc(100% - 8px)"
  }
})
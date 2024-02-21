import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY } from '../../Components/constants';
import { dayOfWeek, date, monthOfYear, year, month } from '../../Components/Helper';
import { useIsFocused } from '@react-navigation/native';
import DaysComponent from '../../Components/DaysComponent/DaysComponent'

export default function Calender() {
  const [selectedYear, setSelectedYear] = useState(year);     // cureent selected year in app
  const [selectedPageMode, setSelectedPageMode]=useState(CALENDER_YEAR);  
  const [isMonthSelected,setIsMonthSelected]=useState(false);

  
  const isFocused = useIsFocused();
  //called when screen isfocused
  useEffect(()=>{
    setSelectedPageMode(CALENDER_YEAR)
    setIsMonthSelected(false)
  },[isFocused])


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

  const renderMonthComponent = ({ item }) => (
    <MonthComponent monthName={item.monthName} amount={item.amount} isPress={(value)=>{setIsMonthSelected(value),setSelectedPageMode(CALENDER_YEAR_MONTH)}}/>
  );
  const renderDaysComponent=({item})=>(
    <DaysComponent monthname={item.monthName}/>
  );
  const handleMonth_Year_Date_Day = (value) => {
    setSelectedYear(value?.year);
  } 
  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackgroundColor }}>
      <Header page={selectedPageMode} data={{ date: date, month: monthOfYear, year: year, day: dayOfWeek }}onInfo={handleMonth_Year_Date_Day}></Header>
      {selectedPageMode==CALENDER_YEAR && 
        <View style={{ flex: 1, marginTop: 5 }}>
        <FlatList
          data={selectedYear == year ? data.slice(0,month):data.slice(0, 12)}
          renderItem={renderMonthComponent}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>}
      {isMonthSelected && 
        <View style={{ flex: 1, marginTop: 5 }}>
        <FlatList
          data={data}
          renderItem={renderDaysComponent}
          showsVerticalScrollIndicator={false}
        />
      </View>}

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
import React, { useState, useEffect,useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import { REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH, INCOME, EXPENSE, TOTAL } from '../../Components/constants'
import TotalIncomeExpenseComponent from '../../Components/totalIncomeExpenseComponent/totalIncomeExpenseComponent'
import { useIsFocused } from '@react-navigation/native';
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { useSelector, useDispatch } from 'react-redux'
import DaysComponent from '../../Components/DaysComponent/DaysComponent'
import { daysOfMonthData,dayOfWeek, date, monthOfYear, year, month, convertToLocalString } from '../../Components/Helper'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const Report = () => {
  const flatListRef = useRef(null);
  const { selectedYear, selectedMonth } = useSelector(state => state.selectedDateMonthYearReducer)
  const [currentselectedYear, setCurrentSelectedYear] = useState(selectedYear);     // cureent selected year in app
  const [selectedPageMode, setSelectedPageMode] = useState(REPORT_CALENDER_YEAR)
  const [selectedMonthName, setSelectedMonthName] = useState(null);
  const [numberOfDaysInMonth,setNumberOfDaysInMonth]=useState(null);
  const isFocused = useIsFocused();
  const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8955881905609463/6363795382';     // banner ads


  useEffect(() => {
    setSelectedPageMode(REPORT_CALENDER_YEAR)
    
  }, [isFocused])

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setSelectedMonthName(selectedMonth);
    setNumberOfDaysInMonth(daysOfMonthData(selectedMonth,selectedYear))
  }, [selectedMonth])

  useEffect(()=>{
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setCurrentSelectedYear(selectedYear)
  },[selectedYear])



  const data = [
    { id: '1', monthName: 'January' },
    { id: '2', monthName: 'February' },
    { id: '3', monthName: 'March' },
    { id: '4', monthName: 'April' },
    { id: '5', monthName: 'May' },
    { id: '6', monthName: 'June' },
    { id: '7', monthName: 'July' },
    { id: '8', monthName: 'August' },
    { id: '9', monthName: 'September' },
    { id: '10', monthName: 'October' },
    { id: '11', monthName: 'November' },
    { id: '12', monthName: 'December', },
  ];



  const renderMonthComponent = ({ item }) => (
    <MonthComponent page={selectedPageMode} monthName={item.monthName} isIncomeOrExpense={null} isPress={(value) => { setSelectedPageMode(REPORT_CALENDER_YEAR_MONTH) }} />
  );

  const renderDaysComponent=({item})=>(
    <DaysComponent page={selectedPageMode} item={item} isIncomeOrExpense={null} isPress={()=>{}}/>
  )

  return (
    <View style={styles.mainView}>
      {/* add banner ads */}
      <View style={{ backgroundColor: Colors.topBottomBarcolor, height: '8%' }} >
          <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
        </View>
      {/* add report */}
      <Header page={selectedPageMode} isIncomeExpense={() => { }} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <TotalIncomeExpenseComponent color={Colors.whitetextcolor} page={selectedPageMode} selectedMonthName={selectedMonthName} />
        </View>
        {/* month display */}
        <View style={{ borderWidth: 1, borderColor: 'white' }} />
        {selectedPageMode == REPORT_CALENDER_YEAR && <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={currentselectedYear == year ? data.slice(0, month) : data.slice(0, 12)}
            renderItem={renderMonthComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>}
        {selectedPageMode == REPORT_CALENDER_YEAR_MONTH &&
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row',  marginTop: 25 }}>
              <View />
              <View style={{flex:0.4}}><Text style={{ fontWeight: 'bold', color: Colors.whitetextcolor }}>Date</Text></View>
              <View style={{flex:1}}><Text style={{ fontWeight: 'bold', color: Colors.whitetextcolor,textAlign:'right'}}>{INCOME}</Text></View>
              <View style={{flex:1}}><Text style={{ fontWeight: 'bold', color: Colors.whitetextcolor,textAlign:'right' }}>{EXPENSE}</Text></View>
              <View style={{flex:1}}><Text style={{ fontWeight: 'bold', color: Colors.whitetextcolor,textAlign:'right' }}>{TOTAL}</Text></View>
            </View>
            <View style={{ borderWidth: 1, borderColor: Colors.whitetextcolor }} />
            <FlatList
            ref={flatListRef}
            data={numberOfDaysInMonth}
            renderItem={renderDaysComponent}
            showsVerticalScrollIndicator={false}
            />
           
            
          </View>
        }


      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  mainView:
  {
    flex: 1, backgroundColor: Colors.pageBackgroundColor
  },
  subView:
  {
    flex: 1, position: 'absolute', right: 8, bottom: 8
  },
  touchableOpacity: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  }
})
export default Report;
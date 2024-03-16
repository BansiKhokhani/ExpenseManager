import React, { useState, useEffect,useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity ,BackHandler} from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Components/Colors'
import { REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH, INCOME, EXPENSE, TOTAL } from '../../Components/constants'
import TotalIncomeExpenseComponent from '../../Components/totalIncomeExpenseComponent/totalIncomeExpenseComponent'
import { useIsFocused } from '@react-navigation/native';
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { useSelector, useDispatch } from 'react-redux'
import DaysComponent from '../../Components/DaysComponent/DaysComponent'
import { daysOfMonthData,dayOfWeek, date, monthOfYear, year, month, convertToLocalString } from '../../Components/Helper'
import { BannerAds } from '../../Components/ads/Ads'


const Report = ({navigation}) => {
  const flatListRef = useRef(null);
  const isFocused = useIsFocused();
  const { selectedYear, selectedMonth } = useSelector(state => state.selectedDateMonthYearReducer) // selected month and year
  const [currentselectedYear, setCurrentSelectedYear] = useState(selectedYear);     // cureent selected year 
  const [selectedPageMode, setSelectedPageMode] = useState(REPORT_CALENDER_YEAR)    //selected page mode i.e., REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH
  const [selectedMonthName, setSelectedMonthName] = useState(null);                 
  const [numberOfDaysInMonth,setNumberOfDaysInMonth]=useState(null);                // number of days of selected month
  const [stack, setstack] = useState([]);                                           // set for the backbutton

  const monthData = [
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
  //call on device backbutton press
  useEffect(() => {
    const backAction = () => {
      if (stack.length > 0) {
        setSelectedPageMode(stack[stack.length-1])
        let newStack=[...stack];
        newStack.splice((stack.length - 1),1);
        setstack(newStack);
       return true //return false when finally need to close app
      }
      else
      {
        return false;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

  }, [stack]);

  //called when screen isfocused
  useEffect(() => {
    setstack([]);
    setSelectedPageMode(REPORT_CALENDER_YEAR)
    
  }, [isFocused])

  //call when selectedMonth update
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setSelectedMonthName(selectedMonth);
    setNumberOfDaysInMonth(daysOfMonthData(selectedMonth,selectedYear))
  }, [selectedMonth])

   //call when selectedYear update
  useEffect(()=>{
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setCurrentSelectedYear(selectedYear)
  },[selectedYear])


  const renderMonthComponent = ({ item }) => (
    <MonthComponent page={selectedPageMode} monthName={item.monthName} isIncomeOrExpense={null} isPress={(value) => { setSelectedPageMode(REPORT_CALENDER_YEAR_MONTH),setstack([REPORT_CALENDER_YEAR]) }} />
  );

  const renderDaysComponent=({item})=>(
    <DaysComponent page={selectedPageMode} item={item} isIncomeOrExpense={null} isPress={(value)=>{navigation.navigate('Calendar',{isFromReport:'Report Page'})}}/>
  )

  return (
    <View style={styles.mainView}>
      {/* add banner ads */}
      <View style={styles.adsView} >
         <BannerAds/>
        </View>
      {/* add report */}
      <Header page={selectedPageMode} isIncomeExpense={() => { }} />
      <View style={styles.subView}>
        <View style={styles.incomeExpenseView}>
          <TotalIncomeExpenseComponent color={Colors.whitetextcolor} page={selectedPageMode} selectedMonthName={selectedMonthName} />
        </View>
        {/* month display */}
        <View style={styles.borderLine} />
        {selectedPageMode == REPORT_CALENDER_YEAR && <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={currentselectedYear == year ? monthData.slice(0, month) :monthData.slice(0, 12)}
            renderItem={renderMonthComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>}
        {/* Days display */}
        {selectedPageMode == REPORT_CALENDER_YEAR_MONTH &&
          <View style={{ flex: 1 }}>
            <View style={styles.innerIncomeExpenseView}>
              <View />
              <View style={{flex:0.4}}><Text style={styles.text}>Date</Text></View>
              <View style={{flex:1}}><Text style={[styles.text,{textAlign:'right'}]}>{INCOME}</Text></View>
              <View style={{flex:1}}><Text style={[styles.text,{textAlign:'right'}]}>{EXPENSE}</Text></View>
              <View style={{flex:1}}><Text style={[styles.text,{textAlign:'right'}]}>{TOTAL}</Text></View>
            </View>
            <View style={styles.borderLine} />
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
  adsView:{ backgroundColor: Colors.topBottomBarcolor },
  subView:
  { flex: 1, paddingHorizontal: 20, paddingTop: 20 },
  incomeExpenseView:{ paddingHorizontal: 20, paddingBottom: 20 },
  borderLine:{ borderWidth: 1, borderColor: 'white' },
  innerIncomeExpenseView:{ flexDirection: 'row',  marginTop: 25 },
  text:{ fontWeight: 'bold', color: Colors.whitetextcolor },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.whitetextcolor,
    borderRadius: 50,
  }
})
export default Report;
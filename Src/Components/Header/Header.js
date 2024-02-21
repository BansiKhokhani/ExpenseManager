import React, { useState,useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TODAY, CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY,EXPENSE,INCOME } from '../constants';
import { year, indexOfMonth, monthnameOfYear, month, daysOfMonth, daynameOfWeek, indexOfDay, date ,monthOfYear,dayOfWeek} from '../Helper';
import { useIsFocused } from '@react-navigation/native';


export default function Header({ page, data,onInfo}) {
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState(EXPENSE);   //value= 'income or 'expense
  const initialData=data;    // today date, day, month, year
  const [allData, setAllData] = useState(initialData);  // month, year, day, date
  const isFocused = useIsFocused();

  //used useEffact to reset with initial value when screen gain the focus
  useEffect(()=>{
    setAllData(initialData);
    if(page==CALENDER_YEAR||page==CALENDER_YEAR_MONTH||page==CALENDER_YEAR_MONTH_DAY)
      onInfo(initialData)
    setIsIncomeOrExpense(EXPENSE)
  },[isFocused])


 
  // Function call on Next button
  const changeForward_Date_year_month_day = () => {
    const nextMonthIndex = indexOfMonth(allData?.month) + 1;
    const nextMonthName = monthnameOfYear(nextMonthIndex);
    const nextDayIndex = (indexOfDay(allData?.day) + 1) % 7;
    const nextDayNameOfWeek = daynameOfWeek(nextDayIndex);

    const setAndNotifyAllData = (data) => {
      setAllData(data);
      onInfo(data);
    }

    const nextYear = () => {
      if ((allData?.year + 1) <= year) // not go forward if the selected year is same as the current year
        setAndNotifyAllData({ ...allData, year: (allData?.year + 1) });
    }

    const nextYear_Month = () => {
      if (nextMonthIndex >= 12)
        setAndNotifyAllData({ ...allData, month: 'January', year: (allData?.year + 1) });
      else {
        if (allData?.year == year) {
          if (nextMonthIndex < (month))
            setAndNotifyAllData({ ...allData, month: nextMonthName });
        }
        else
          setAndNotifyAllData({ ...allData, month: nextMonthName })
      }
    }

    const nextYear_Month_Day = () => {    
      if (allData?.year == year) {
        if (nextMonthIndex == month) {
          if (allData?.date < date) 
                setAndNotifyAllData({ ...allData, date: (allData?.date + 1), day: nextDayNameOfWeek });
        }
        else if (nextMonthIndex < month) 
        handleMonthsLastDay();
      }
      else 
      handleMonthsLastDay();
    }
     // child function
    const handleMonthsLastDay=()=>{
      if (daysOfMonth(allData?.month, allData?.year) == allData?.date) {
        if (allData?.month == 'December') 
          setAndNotifyAllData({ ...allData, date: 1, day: nextDayNameOfWeek, month: 'January', year: allData?.year + 1 });
        else 
          setAndNotifyAllData({ ...allData, date: 1, day: nextDayNameOfWeek, month: nextMonthName });
      }
      else 
        setAndNotifyAllData({ ...allData, date: (allData?.date + 1), day: nextDayNameOfWeek });
    }

    if (page == CALENDER_YEAR)
      nextYear();
    else if (page == CALENDER_YEAR_MONTH)
      nextYear_Month();
    else
      nextYear_Month_Day();

  }

  // Function call on previous button
  const changeBack_Date_year_month_day = () => {
    const currentDayIndex = indexOfDay(allData?.day);
    const currentMonthIndex = indexOfMonth(allData?.month);
    const previousDayIndex = (currentDayIndex === 0) ? 6 : (currentDayIndex - 1);
    const previousMonth = monthnameOfYear(currentMonthIndex - 1);

    // set actual data
    const setAndNotifyAllData = (data) => {
      setAllData(data);
      onInfo(data);
    }

    // previous button to select previous year 
    const previousYear = () => {
      if ((allData?.year - 1) >= 2014)
        setAndNotifyAllData({ ...allData, year: (allData?.year - 1) });
    }

    // previous button to select previous year and month
    const previousYear_Month = () => {
      if (currentMonthIndex <= 0) {
        if ((allData?.year - 1 >= 2014))
          setAndNotifyAllData({ ...allData, month: 'December', year: (allData?.year - 1) });
      }
      else
        setAndNotifyAllData({ ...allData, month: previousMonth });
    }

    // previous button to select previous year, month and day, date
    const previousYear_Month_day = () => {
      const previousDay = daynameOfWeek(previousDayIndex);
      if (allData?.date <= 1) {
        if (currentMonthIndex <= 0) {
          if ((allData?.year - 1 >= 2014))
            setAndNotifyAllData({ ...allData, year: (allData?.year - 1), date: daysOfMonth('December', allData?.year), month: 'December', day: previousDay });
        }
        else {
          const month = previousMonth;
          setAndNotifyAllData({ ...allData, date: daysOfMonth(month, allData?.year), month: previousMonth, day: previousDay })
        }
      }
      else
        setAndNotifyAllData({ ...allData, date: allData?.date - 1, day: previousDay })
    }


    if (page === CALENDER_YEAR)  // change only year back
      previousYear();
    else if (page === CALENDER_YEAR_MONTH)   //change year, month back
      previousYear_Month();
    else   //change year, month, day back
      previousYear_Month_day();

  }


  const selectType = (value) => {
    setIsIncomeOrExpense(value);
  }

  // const d={
  //   2024:{
  //     January:{ 
  //       1:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}]}},

  //   }
  // }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.topBottomBarcolor}
        barStyle="light-content"
      />
      <>
        {(page == TODAY || page == CALENDER_YEAR_MONTH_DAY) &&
          <View style={styles.mainView}>
            <View style={styles.calenderMainView} >
              <View style={styles.buttonView}>
               { page!=TODAY&&<TouchableOpacity activeOpacity={1} onPress={changeBack_Date_year_month_day}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>}
              </View>
              <View style={styles.dateMainView}>
                <View style={styles.dateSubView}>
                  <Text style={styles.text}>{allData?.month} </Text>
                  <Text style={styles.text}>{allData?.date}, </Text>
                  <Text style={styles.text}>{allData?.year}</Text>
                </View>
                <View style={styles.dayView}>
                  <Text style={[styles.text, { fontSize: 25 }]}>{allData?.day}</Text>
                </View>
              </View>
              <View style={styles.buttonView}>
                {page!=TODAY&&<TouchableOpacity activeOpacity={1} onPress={page == CALENDER_YEAR_MONTH_DAY ? changeForward_Date_year_month_day : () => ''}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>}
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ? EXPENSE : INCOME}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType(EXPENSE) }}>
                  <View><Text style={[isIncomeOrExpense == EXPENSE ? styles.selectedtype : styles.unSelectedTYpe]}>EXPENSE</Text></View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType(INCOME) }}>
                  <View><Text style={[isIncomeOrExpense == INCOME ? styles.selectedtype : styles.unSelectedTYpe]}>INCOME</Text></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }


        {/* change here for different page of parameter */}

        {(page == CALENDER_YEAR || page == CALENDER_YEAR_MONTH) &&
          <View style={styles.mainView}>
            <View style={styles.calenderMainView} >
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeBack_Date_year_month_day}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
              <View style={styles.dateMainView}>
                <View style={styles.dateSubView}>
                  <Text style={[styles.text, page == 'CalenderWithYear' && { fontSize: 35 }]}>{allData?.year}</Text>
                </View>
                <View style={styles.dayView}>
                  {page == 'CalenderWithMonth_Year' && <Text style={[styles.text, { fontSize: 30 }]}>{allData?.month}</Text>}
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeForward_Date_year_month_day}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ? EXPENSE : INCOME}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType(EXPENSE) }}>
                  <View><Text style={[isIncomeOrExpense ==EXPENSE ? styles.selectedtype : styles.unSelectedTYpe]}>EXPENSE</Text></View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType(INCOME) }}>
                  <View><Text style={[isIncomeOrExpense == INCOME ? styles.selectedtype : styles.unSelectedTYpe]}>INCOME</Text></View>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        }
      </>
    </>
  )
}
const styles = StyleSheet.create({

  mainView: { alignItems: 'center' },
  calenderMainView: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.topBottomBarcolor, width: '100%', justifyContent: 'center', paddingTop: 25 },
  buttonView: { paddingHorizontal: 10 },
  dateMainView: { alignItems: 'center' },
  dateSubView: { flexDirection: 'row' },
  text: { color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 },
  dayView: { alignItems: 'center' },
  showincomeExpensePriceView: { alignItems: 'center', paddingTop: 6, backgroundColor: Colors.topBottomBarcolor, width: '100%' },
  incomeExpenseTabView: { flexDirection: 'row', alignItems: 'center', paddingBottom: 5, backgroundColor: Colors.topBottomBarcolor, width: '100%', justifyContent: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  selectedtype: {
    fontWeight: 'bold', fontSize: 18,
    color: Colors.whitetextcolor,
    borderBottomWidth: 2,
    borderColor: Colors.whitetextcolor
  },
  unSelectedTYpe: {
    fontWeight: 'bold', fontSize: 18,
    color: Colors.Platinumtextcolor
  }
})
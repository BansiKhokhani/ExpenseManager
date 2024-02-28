import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TODAY, CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY, EXPENSE, INCOME } from '../constants';
import { year, indexOfMonth, monthnameOfYear, month, daysOfMonth, daynameOfWeek, indexOfDay, date, monthOfYear, dayOfWeek } from '../Helper';
import { useIsFocused } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';

export default function Header({ page, isIncomeExpense }) {
  const dispatch = useDispatch();
  const initialData = useSelector(state => state.selectedDateMonthYearReducer);  //get data from redux
  const expenseData = useSelector(state => state.expenseReducer);
  const incomeData=useSelector(state=>state.incomeReducer);
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState(EXPENSE);   //value= 'income or 'expense
  const [allData, setAllData] = useState(initialData);  // set redux data
  const isFocused = useIsFocused();
  // dispatch data 
  const handleDispatch = (selectedDate, selectedDay, selectedMonth, selectedYear) => {
    dispatch(updateselected_Date_Month_Year(selectedDate, selectedDay, selectedMonth, selectedYear))
  }

  //used useEffact to reset with initial value when screen gain the focus
  useEffect(() => {
    handleDispatch(date, dayOfWeek, monthOfYear, year);
    setAllData({ selectedDate: date, selectedDay: dayOfWeek, selectedMonth: monthOfYear, selectedYear: year }); //set today date, month, year, day on screen change
    setIsIncomeOrExpense(EXPENSE)
    isIncomeExpense(EXPENSE)
  }, [isFocused])

  // used useEffact to setAllData when TODAY page not focused
  useEffect(() => {
    if (page != TODAY)
      setAllData(initialData)
  }, [initialData])

  // Function call on Next button
  const changeForward_Date_year_month_day = () => {
    const nextMonthIndex = indexOfMonth(allData?.selectedMonth) + 1;
    const nextMonthName = monthnameOfYear(nextMonthIndex);
    const nextDayIndex = (indexOfDay(allData?.selectedDay) + 1) % 7;
    const nextDayNameOfWeek = daynameOfWeek(nextDayIndex);

    const setAndNotifyAllData = (data) => {

      setAllData(data);
      handleDispatch(data.selectedDate, data.selectedDay, data.selectedMonth, data.selectedYear)
    }

    const nextYear = () => {
      if ((allData?.selectedYear + 1) <= year) // not go forward if the selected year is same as the current year
        setAndNotifyAllData({ ...allData, selectedYear: (allData?.selectedYear + 1) });
    }


    const nextYear_Month = () => {
      if (nextMonthIndex >= 12)
        setAndNotifyAllData({ ...allData, selectedMonth: 'January', selectedYear: (allData?.selectedYear + 1) });
      else {
        if (allData?.selectedYear == year) {
          if (nextMonthIndex < (month))
            setAndNotifyAllData({ ...allData, selectedMonth: nextMonthName });
        }
        else
          setAndNotifyAllData({ ...allData, selectedMonth: nextMonthName })
      }
    }

    const nextYear_Month_Day = () => {
      if (allData?.selectedYear == year) {
        if (nextMonthIndex == month) {
          if (allData?.selectedDate < date)
            setAndNotifyAllData({ ...allData, selectedDate: (allData?.selectedDate + 1), selectedDay: nextDayNameOfWeek });
        }
        else if (nextMonthIndex < month)
          handleMonthsLastDay();
      }
      else
        handleMonthsLastDay();
    }
    // child function
    const handleMonthsLastDay = () => {
      if (daysOfMonth(allData?.selectedMonth, allData?.selectedDate) == allData?.selectedDate) {
        if (allData?.selectedMonth == 'December')
          setAndNotifyAllData({ ...allData, selectedDate: 1, selectedDay: nextDayNameOfWeek, selectedMonth: 'January', selectedYear: allData?.selectedYear + 1 });
        else
          setAndNotifyAllData({ ...allData, selectedDate: 1, selectedDay: nextDayNameOfWeek, selectedMonth: nextMonthName });
      }
      else
        setAndNotifyAllData({ ...allData, selectedDate: (allData?.selectedDate + 1), selectedDay: nextDayNameOfWeek });
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
    const currentDayIndex = indexOfDay(allData?.selectedDay);
    const currentMonthIndex = indexOfMonth(allData?.selectedMonth);
    const previousDayIndex = (currentDayIndex === 0) ? 6 : (currentDayIndex - 1);
    const previousMonth = monthnameOfYear(currentMonthIndex - 1);

    // set actual data
    const setAndNotifyAllData = (data) => {
      setAllData(data);
      handleDispatch(data.selectedDate, data.selectedDay, data.selectedMonth, data.selectedYear)

    }

    // previous button to select previous year 
    const previousYear = () => {
      if ((allData?.selectedYear - 1) >= 2014)
        setAndNotifyAllData({ ...allData, selectedYear: (allData?.selectedYear - 1) });
    }

    // previous button to select previous year and month
    const previousYear_Month = () => {
      if (currentMonthIndex <= 0) {
        if ((allData?.selectedYear - 1 >= 2014))
          setAndNotifyAllData({ ...allData, selectedMonth: 'December', selectedYear: (allData?.selectedYear - 1) });
      }
      else
        setAndNotifyAllData({ ...allData, selectedMonth: previousMonth });
    }

    // previous button to select previous year, month and day, date
    const previousYear_Month_day = () => {
      const previousDay = daynameOfWeek(previousDayIndex);
      if (allData?.selectedDate <= 1) {
        if (currentMonthIndex <= 0) {
          if ((allData?.selectedYear - 1 >= 2014))
            setAndNotifyAllData({ ...allData, selectedYear: (allData?.selectedYear - 1), selectedDate: daysOfMonth('December', allData?.selectedYear), selectedMonth: 'December', selectedDay: previousDay });
        }
        else {
          const month = previousMonth;
          setAndNotifyAllData({ ...allData, selectedDate: daysOfMonth(month, allData?.selectedYear), selectedMonth: previousMonth, selectedDay: previousDay })
        }
      }
      else
        setAndNotifyAllData({ ...allData, selectedDate: allData?.selectedDate - 1, selectedDay: previousDay })
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
    isIncomeExpense(value);
  }

  const handletotalCalculation = (incomeExpenseData) => {
    let totalexpense = 0;
    if (page == TODAY || page === CALENDER_YEAR_MONTH_DAY) {
      const data = incomeExpenseData?.[allData?.selectedYear]?.[allData?.selectedMonth]?.[allData?.selectedDate];
      data?.filter(item => {
        totalexpense += parseInt(item.inputPrice)
      })
    }
    else if (page === CALENDER_YEAR_MONTH) {
      const data = incomeExpenseData?.[allData?.selectedYear]?.[allData?.selectedMonth];
      for (const key in data) {
        data[key]?.filter(item => {
          totalexpense += parseInt(item.inputPrice)
        })
      }
    }
    else
    {
      const data = incomeExpenseData?.[allData?.selectedYear];
      for (const key in data) {
        for(const dateKey in data[key])
        {
          data[key][dateKey]?.filter(item => {
            totalexpense += parseInt(item.inputPrice)
          })
        }
        
      }
      
    }
    return (parseFloat(totalexpense)).toFixed(2);
  }

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
                {page != TODAY && <TouchableOpacity activeOpacity={1} onPress={changeBack_Date_year_month_day}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>}
              </View>
              <View style={styles.dateMainView}>
                <View style={styles.dateSubView}>
                  <Text style={styles.text}>{allData?.selectedMonth} </Text>
                  <Text style={styles.text}>{allData?.selectedDate}, </Text>
                  <Text style={styles.text}>{allData?.selectedYear}</Text>
                </View>
                <View style={styles.dayView}>
                  <Text style={[styles.text, { fontSize: 25 }]}>{allData?.selectedDay}</Text>
                </View>
              </View>
              <View style={styles.buttonView}>
                {page != TODAY && <TouchableOpacity activeOpacity={1} onPress={page == CALENDER_YEAR_MONTH_DAY ? changeForward_Date_year_month_day : () => ''}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>}
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ? EXPENSE : INCOME}</Text>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ?handletotalCalculation(expenseData):handletotalCalculation(incomeData)}</Text>
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
                  <Text style={[styles.text, page == 'CalenderWithYear' && { fontSize: 35 }]}>{allData?.selectedYear}</Text>
                </View>
                <View style={styles.dayView}>
                  {page == 'CalenderWithMonth_Year' && <Text style={[styles.text, { fontSize: 30 }]}>{allData?.selectedMonth}</Text>}
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeForward_Date_year_month_day}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ? EXPENSE : INCOME}</Text>
              <Text style={styles.text}>{isIncomeOrExpense == EXPENSE ?handletotalCalculation(expenseData):handletotalCalculation(incomeData)}</Text>
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
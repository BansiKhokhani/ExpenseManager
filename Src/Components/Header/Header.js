import React, { useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TODAY, CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY } from '../constants';
import { year, IndexOfmonth, MonthOfYear, month, DaysOfMonth, DayOfWeek, IndexofDay, dayOfWeek, date, monthOfYear } from '../Helper';

export default function Header({ page, data, onInfo }) {
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState('income');   //value= 'income or 'expense
  const [allData, setAllData] = useState(data);  // month, year, day, date


  const changeForward_Date_year_month_day = () => {
    if (page == CALENDER_YEAR) {
      if ((allData?.year + 1) <= year) // not go forward if the selected year is same as the current year
      {
        setAllData({ ...allData, year: (allData?.year + 1) })
        onInfo({ ...allData, year: (allData?.year + 1) })
      }
    }
    else if (page == CALENDER_YEAR_MONTH) {
      if ((IndexOfmonth(allData?.month)) >= 11) {
        setAllData({ ...allData, month: 'January', year: (allData?.year + 1) })
        onInfo({ ...allData, month: 'January', year: (allData?.year + 1) })
      }
      else {
        if (allData?.year == year) {
          if (((IndexOfmonth(allData?.month) + 1)) < (month))
            setAllData({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
          onInfo({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
        }
        else {
          setAllData({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
          onInfo({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
        }
      }
    }
    else {

      if (allData?.year == year) {
        if ((IndexOfmonth(allData?.month) + 1) == month) {
          if (allData?.date < date) {
            setAllData({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
            onInfo({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
          }
        }
        else if ((IndexOfmonth(allData?.month) + 1) < month) {
          if (DaysOfMonth(allData?.month, allData?.year) == allData?.date) {
            if (allData?.month == 'December') {
              setAllData({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: 'January', year: allData?.year + 1 })
              onInfo({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: 'January', year: allData?.year + 1 })
            }
            else {
              setAllData({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
              onInfo({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
            }
          }
          else {
            setAllData({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
            onInfo({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
          }
        }
        
      }
      else {

        if (DaysOfMonth(allData?.month, allData?.year) == allData?.date) {
          if (allData?.month == 'December') {
            setAllData({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: 'January', year: allData?.year + 1 })
            onInfo({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: 'January', year: allData?.year + 1 })
          }
          else {
            setAllData({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
            onInfo({ ...allData, date: 1, day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7), month: (MonthOfYear((IndexOfmonth(allData?.month) + 1))) })
          }
        }
        else {
          setAllData({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
          onInfo({ ...allData, date: (allData?.date + 1), day: DayOfWeek((IndexofDay(allData?.day) + 1) % 7) })
        }
      }
    }

  }

  const changeBack_Date_year_month_day = () => {
    if (page == CALENDER_YEAR) {
      if ((allData?.year - 1) >= 2014) {
        setAllData({ ...allData, year: (allData?.year - 1) })
        onInfo({ ...allData, year: (allData?.year - 1) })
      }
    }
    else if (page == CALENDER_YEAR_MONTH) {
      if ((IndexOfmonth(allData?.month)) <= 0) {
        if ((allData?.year - 1 >= 2014)) {
          setAllData({ ...allData, month: 'December', year: (allData?.year - 1) })
          onInfo({ ...allData, month: 'December', year: (allData?.year - 1) })
        }
      }
      else {

        setAllData({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) - 1))) })
        onInfo({ ...allData, month: (MonthOfYear((IndexOfmonth(allData?.month) - 1))) })
      }
    }
    else {
      const previousDayIndex = (IndexofDay(allData?.day) === 0) ? 6 : (IndexofDay(allData?.day) - 1);
      if (allData?.date <= 1) {
        if ((IndexOfmonth(allData?.month)) <= 0) {
          if ((allData?.year - 1 >= 2014)) {
            setAllData({ ...allData, year: (allData?.year - 1), date: DaysOfMonth('December', allData?.year), month: 'December', day: DayOfWeek(previousDayIndex) })
            onInfo({ ...allData, year: (allData?.year - 1), date: DaysOfMonth('December', allData?.year), month: 'December', day: DayOfWeek(previousDayIndex) })
          }
        }
        else {
          const month = (MonthOfYear((IndexOfmonth(allData?.month) - 1)));
          setAllData({ ...allData, date: DaysOfMonth(month, allData?.year), month: (MonthOfYear((IndexOfmonth(allData?.month) - 1))), day: DayOfWeek(previousDayIndex) })
          onInfo({ ...allData, date: DaysOfMonth(month, allData?.year), month: (MonthOfYear((IndexOfmonth(allData?.month) - 1))), day: DayOfWeek(previousDayIndex) })
        }
      }
      else {
        console.log(DayOfWeek((IndexofDay(allData?.day) - 1) % 7));
        setAllData({ ...allData, date: allData?.date - 1, day: DayOfWeek(previousDayIndex) })
        onInfo({ ...allData, date: allData?.date - 1, day: DayOfWeek(previousDayIndex) })
      }
    }

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
                <TouchableOpacity activeOpacity={1} onPress={changeBack_Date_year_month_day}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
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
                <TouchableOpacity activeOpacity={1} onPress={page == CALENDER_YEAR_MONTH_DAY ? changeForward_Date_year_month_day : () => ''}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == 'expense' ? 'Expense' : 'Income'}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('expense') }}>
                  <View><Text style={[isIncomeOrExpense == 'expense' ? styles.selectedtype : styles.unSelectedTYpe]}>EXPENSES</Text></View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('income') }}>
                  <View><Text style={[isIncomeOrExpense == 'income' ? styles.selectedtype : styles.unSelectedTYpe]}>INCOME</Text></View>
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
                  {page == 'CalenderWithMonth_Year' && <Text style={[styles.text, { fontSize: 35 }]}>{allData?.month}</Text>}
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeForward_Date_year_month_day}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == 'expense' ? 'Expense' : 'Income'}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('expense') }}>
                  <View><Text style={[isIncomeOrExpense == 'expense' ? styles.selectedtype : styles.unSelectedTYpe]}>EXPENSES</Text></View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('income') }}>
                  <View><Text style={[isIncomeOrExpense == 'income' ? styles.selectedtype : styles.unSelectedTYpe]}>INCOME</Text></View>
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
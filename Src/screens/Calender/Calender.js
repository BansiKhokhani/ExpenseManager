import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { ADD, CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY,EDIT } from '../../Components/constants';
import { dayOfWeek, date, monthOfYear, year, month, convertToLocalString } from '../../Components/Helper';
import { useIsFocused } from '@react-navigation/native';
import DaysComponent from '../../Components/DaysComponent/DaysComponent'
import { useSelector, useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import ProductComponent from '../../Components/ProductComponent/ProductComponent'
import { daysOfMonthData } from '../../Components/Helper'
import { EXPENSE, INCOME } from '../../Components/constants'
import { addExpense, addIncome ,updateExpense,updateIncome} from '../../Components/Redux/Action';

export default function Calender() {
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)
  const dispatch = useDispatch();
  const todayExpenseData = useSelector(state => state.expenseReducer[initialdata.selectedYear]?.[initialdata.selectedMonth]?.[initialdata.selectedDate]);
  const todayIncomeData = useSelector(state => state.incomeReducer[initialdata.selectedYear]?.[initialdata.selectedMonth]?.[initialdata.selectedDate]);
  const [selectedYear, setSelectedYear] = useState(initialdata.selectedYear);     // cureent selected year in app
  const [selectedPageMode, setSelectedPageMode] = useState(CALENDER_YEAR);        // current selected page mode i.e., CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY
  const [isMonthSelected, setIsMonthSelected] = useState(false);                  
  const [isDaySelected, setIsDaySelected] = useState(false);
  const isFocused = useIsFocused();
  const [showCustomComponent, setShowCustomComponent] = useState(false);        // It used for 
  const [numberOfDaysOfMonth, setNumberOfDaysOfMonth] = useState(null);
  const [productData, setproductData] = useState([]);
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState(EXPENSE);
  const [editData, setEditData] = useState(null);  // used for when product edit by user



  useEffect(() => {
    if (isIncomeOrExpense == EXPENSE)
      setproductData(todayExpenseData);
    else
      setproductData(todayIncomeData);

  }, [todayExpenseData, todayIncomeData, isIncomeOrExpense]);


  // Used to call this function AddButtonComponentButton pressed by user
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }


  const handleChildData = (value) => {
    const inputPrice = convertToLocalString(value?.inputPrice);
    const details = { inputDetail: value.inputDetail, inputPrice: inputPrice, uniqueId: value.uniqueId };
    if (isIncomeOrExpense == EXPENSE) {
      if (editData == null)
        dispatch(addExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details));
      else
        dispatch(updateExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details))

    }
    else {
      if (editData == null)
        dispatch(addIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details));
      else
        dispatch(updateIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details))
    }

  }
  //called when screen isfocused
  useEffect(() => {
    setSelectedPageMode(CALENDER_YEAR)
    setIsMonthSelected(false)
    setIsDaySelected(false);
  }, [isFocused])

  useEffect(() => {
    setSelectedYear(initialdata.selectedYear);
    setNumberOfDaysOfMonth(daysOfMonthData(initialdata.selectedMonth, initialdata.selectedYear))
  }, [initialdata])

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

  const renderItem = ({ item }) => (
    <ProductComponent data={item} isIncomeExpense={isIncomeOrExpense} isShowCustomComponent={handleButtonPress} editData={(data) => { setEditData(data) }} />
  )


  const renderMonthComponent = ({ item }) => (
    <MonthComponent page={selectedPageMode} monthName={item.monthName} isIncomeOrExpense={isIncomeOrExpense} isPress={(value) => { setIsMonthSelected(value), setSelectedPageMode(CALENDER_YEAR_MONTH) }} />
  );
  const renderDaysComponent = ({ item }) => (
    <DaysComponent item={item} isIncomeOrExpense={isIncomeOrExpense} isPress={(value) => { setIsMonthSelected(!value), setIsDaySelected(value), setSelectedPageMode(CALENDER_YEAR_MONTH_DAY) }} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackgroundColor }}>
      <Header page={selectedPageMode} isIncomeExpense={(value) => { setIsIncomeOrExpense(value) }}></Header>
      {selectedPageMode == CALENDER_YEAR &&
        <View style={{ flex: 1, marginTop: 5 }}>
          <FlatList
            data={selectedYear == year ? data.slice(0, month) : data.slice(0, 12)}
            renderItem={renderMonthComponent}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>}
      {isMonthSelected &&
        <View style={{ flex: 1, marginTop: 5 }}>
          <FlatList
            data={numberOfDaysOfMonth}
            renderItem={renderDaysComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>}
      {isDaySelected &&
        <View style={{ flex: 1 }}>
          {
            showCustomComponent && (
              <AddNewItem isShowCustomComponent={handleButtonPress} itemType={editData == null ? ADD : EDIT} onData={handleChildData} editData={editData} />
            )
          }
          <FlatList showsVerticalScrollIndicator={false} data={productData} renderItem={renderItem} style={{ flex: 1, marginTop: 5 }}></FlatList>
          <View style={styles.subView}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => { handleButtonPress(!showCustomComponent), setEditData(null) }} activeOpacity={1}>
              <View>
                <AntDesign name="plus" size={25} color={Colors.buttonColor} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      }

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
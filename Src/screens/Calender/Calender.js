import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler, Alert } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Components/Colors'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { ADD, CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY, EDIT } from '../../Components/constants';
import { dayOfWeek, date, monthOfYear, year, month, convertToLocalString } from '../../Components/Helper';
import { useIsFocused } from '@react-navigation/native';
import DaysComponent from '../../Components/DaysComponent/DaysComponent'
import { useSelector, useDispatch } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import ProductComponent from '../../Components/ProductComponent/ProductComponent'
import { daysOfMonthData } from '../../Components/Helper'
import { EXPENSE, INCOME } from '../../Components/constants'
import { addExpense, addIncome, updateExpense, updateIncome } from '../../Components/Redux/Action';

export default function Calender({ route }) {
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)     // selected date, month and year
  const expenseData = useSelector(state => state.expenseReducer[initialdata.selectedYear]?.[initialdata.selectedMonth]?.[initialdata.selectedDate]); // get and store the specified year, month and date product data of the EXPENSE
  const incomeData = useSelector(state => state.incomeReducer[initialdata.selectedYear]?.[initialdata.selectedMonth]?.[initialdata.selectedDate]); //get and store the specified year, month and date product data of the INCOME
  const [selectedYear, setSelectedYear] = useState(initialdata.selectedYear);     //  selected year 
  const [selectedPageMode, setSelectedPageMode] = useState(CALENDER_YEAR);        //selected page mode i.e., CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY
  const [showCustomComponent, setShowCustomComponent] = useState(false);        // for the ADD new product (Item) component popup or model
  const [numberOfDaysOfMonth, setNumberOfDaysOfMonth] = useState(null);         // number of days of selected month
  const [productData, setproductData] = useState([]);                           // Store INCOME or EXPENSE product(item) data
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState(EXPENSE);          // store selected mode (INCOME or EXPENSE)
  const [editData, setEditData] = useState(null);                               // store selected product( item ) edit data
  const [stack, setstack] = useState([]);                                       // set for the backbutton

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
        setSelectedPageMode(stack[stack.length - 1])
        let newStack = [...stack];
        newStack.splice((stack.length - 1), 1);
        setstack(newStack);
        return true //return false when finally need to close app
      }
      else
        return false;

    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();

  }, [stack]);

  // call when new product ADD or Edit or Mode change by user
  useEffect(() => {
    if (isIncomeOrExpense == EXPENSE)
      setproductData(expenseData);
    else
      setproductData(incomeData);

  }, [expenseData, incomeData, isIncomeOrExpense]);

  //called when screen isfocused
  useEffect(() => {
    if (route?.params?.isFromReport === 'Report Page') {
      setstack([CALENDER_YEAR, CALENDER_YEAR_MONTH])
      setSelectedPageMode(CALENDER_YEAR_MONTH_DAY);
      route.params.isFromReport = '';
    }
    else {
      setstack([])
      setSelectedPageMode(CALENDER_YEAR)
    }
  }, [isFocused])

  // call on initialData props update
  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    setSelectedYear(initialdata.selectedYear);
    setNumberOfDaysOfMonth(daysOfMonthData(initialdata.selectedMonth, initialdata.selectedYear))
  }, [initialdata])


  // Used to call this function AddButtonComponent pressed 
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  // Add or Edit the income or expense data in redux from here
  const handleChildData = (value) => {
    const inputPrice = convertToLocalString(value?.inputPrice);
    const details = { inputDetail: value.inputDetail, inputPrice: inputPrice, uniqueId: value.uniqueId };
    if (isIncomeOrExpense == EXPENSE) {
      if (editData == null)
        dispatch(addExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details)); // add expense data into redux
      else
        dispatch(updateExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details)) // update expense data into redux

    }
    else {
      if (editData == null)
        dispatch(addIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details)); //add income data into redux
      else
        dispatch(updateIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details)) // update income data into redux
    }

  }
  const renderItem = ({ item }) => (
    <ProductComponent data={item} isIncomeExpense={isIncomeOrExpense} isShowCustomComponent={handleButtonPress} editData={(data) => { setEditData(data) }} />
  )


  const renderMonthComponent = ({ item }) => (
    <MonthComponent page={selectedPageMode} monthName={item.monthName} isIncomeOrExpense={isIncomeOrExpense} isPress={(value) => { setSelectedPageMode(CALENDER_YEAR_MONTH), stack.length < 2 && setstack([...stack, CALENDER_YEAR]) }} />
  );
  const renderDaysComponent = ({ item }) => (
    <DaysComponent page={selectedPageMode} item={item} isIncomeOrExpense={isIncomeOrExpense} isPress={(value) => { setSelectedPageMode(CALENDER_YEAR_MONTH_DAY), stack.length < 2 && setstack([...stack, CALENDER_YEAR_MONTH]) }} />
  );

  return (
    <View style={styles.wrapper}>
      {/* header component */}
      <Header page={selectedPageMode} isIncomeExpense={(value) => { setIsIncomeOrExpense(value) ,flatListRef.current?.scrollToOffset({ offset: 0, animated: true })}}></Header>
      {/*  display months on CALENDER_YEAR page mode*/}
      {selectedPageMode == CALENDER_YEAR &&
        <View style={styles.mainView}>
          <FlatList
            ref={flatListRef}
            data={selectedYear == year ? monthData.slice(0, month) : monthData.slice(0, 12)}
            renderItem={renderMonthComponent}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{  flex: 1,justifyContent: "space-around"}}
            
          />
        </View>}
      {/*  display days of month on CALENDER_YEAR_MONTH page mode*/}
      {selectedPageMode == CALENDER_YEAR_MONTH &&
        <View style={styles.mainView}>
          <FlatList
            ref={flatListRef}
            data={numberOfDaysOfMonth}
            renderItem={renderDaysComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>}
      {/* display products on  CALENDER_YEAR_MONTH_DAY page mode*/}
      {selectedPageMode == CALENDER_YEAR_MONTH_DAY &&
        <View style={{ flex: 1 }}>
          {
            showCustomComponent && (
              <AddNewItem isShowCustomComponent={handleButtonPress} itemType={editData == null ? ADD : EDIT} onData={handleChildData} editData={editData} />
            )
          }
          <FlatList showsVerticalScrollIndicator={false} data={productData} renderItem={renderItem} style={styles.productFlatlist}></FlatList>
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
  wrapper: { flex: 1, backgroundColor: Colors.pageBackgroundColor },
  mainView: {
    marginTop: 5,flex:1
  },
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  productFlatlist: {
    flex: 1, marginTop: 5
  }
})
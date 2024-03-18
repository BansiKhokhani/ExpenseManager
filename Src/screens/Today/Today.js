import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Header from '../../Components/Header/Header';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import Colors from '../../Components/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductComponent from '../../Components/ProductComponent/ProductComponent';
import {  date, monthOfYear, year, convertToLocalString } from '../../Components/Helper';
import { ADD,  EXPENSE, TODAY, EDIT } from '../../Components/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, addIncome, updateExpense, updateIncome } from '../../Components/Redux/Action';
import SplashScreen from 'react-native-splash-screen'

export default  Today=() =>{
  const dispatch = useDispatch();
  const todayExpenseData = useSelector(state => state.expenseReducer[year]?.[monthOfYear]?.[date]); // get and store the specified year, month and date product data of the EXPENSE
  const todayIncomeData = useSelector(state => state.incomeReducer[year]?.[monthOfYear]?.[date]);   // get and store the specified year, month and date product data of the INCOME
  const [showCustomComponent, setShowCustomComponent] = useState(false);  // for the ADD new product (Item) component popup or model
  const [data, setData] = useState();                                     // Store INCOME or EXPENSE product(item) data
  const [editData, setEditData] = useState(null);                         // store selected product( item ) edit data
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState(EXPENSE);    // store selected mode (INCOME or EXPENSE)

// Hide the splash screen 
  useEffect(() => {
    SplashScreen.hide();
  }, [])

  // call when new product ADD or Edit or Mode change by user
  useEffect(() => {
    if (isIncomeOrExpense == EXPENSE)
      setData(todayExpenseData);
    else
      setData(todayIncomeData);

  }, [todayExpenseData, todayIncomeData, isIncomeOrExpense]);


  // Used to call this function AddButtonComponent pressed 
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  // Add or Edit the income or expense data in redux from here
  const handleChildData = (value) => {
    const inputPrice = convertToLocalString(value?.inputPrice); 
    console.log(value?.inputDetail)
    const details = { inputDetail: value.inputDetail, inputPrice: inputPrice, uniqueId: value.uniqueId }; 
    if (isIncomeOrExpense == EXPENSE) {
      if (editData == null)
        dispatch(addExpense(year, monthOfYear, date, details));  // add expense data into redux
      else
        dispatch(updateExpense(year, monthOfYear, date, details)); // update expense data into redux
    }
    else {
      if (editData == null)
        dispatch(addIncome(year, monthOfYear, date, details)); //add income data into redux
      else
        dispatch(updateIncome(year, monthOfYear, date, details)); // update income data into redux
    }
  }
  // productComponent which is added by user
  const renderItem = ({ item }) => (
    <ProductComponent data={item} isIncomeExpense={isIncomeOrExpense} isShowCustomComponent={handleButtonPress} editData={(data) => { setEditData(data) }} />
  )

  return (
    <View style={styles.mainView}>
      {/* Header Component */}
      <Header page={TODAY} isIncomeExpense={(value) => { setIsIncomeOrExpense(value) }}></Header>
      <View style={{ flex: 1 }}>
        {
          showCustomComponent && (
            // Add new procut popUP or model
            <AddNewItem isShowCustomComponent={handleButtonPress} itemType={editData == null ? ADD : EDIT} onData={handleChildData} editData={editData} />
          )
        }
        {/* shows all product */}
        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={renderItem} style={styles.productFlatlist}></FlatList>
        {/* Add new product Button */}
        <View style={styles.subView}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => { handleButtonPress(!showCustomComponent), setEditData(null) }} activeOpacity={1}>
            <View>
              <AntDesign name="plus" size={25} color={Colors.buttonColor} />
            </View>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: Colors.whitetextcolor,
    borderRadius: 50,
  },
  productFlatlist:{
    flex: 1, marginTop: 5 
  }
})

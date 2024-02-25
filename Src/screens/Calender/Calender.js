import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
import { CALENDER_YEAR, CALENDER_YEAR_MONTH, CALENDER_YEAR_MONTH_DAY } from '../../Components/constants';
import { dayOfWeek, date, monthOfYear, year, month } from '../../Components/Helper';
import { useIsFocused } from '@react-navigation/native';
import DaysComponent from '../../Components/DaysComponent/DaysComponent'
import { UseSelector, useSelector } from 'react-redux'
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import ProductComponent from '../../Components/ProductComponent/ProductComponent'
import { daysOfMonthData } from '../../Components/Helper'


export default function Calender() {
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)
  const [selectedYear, setSelectedYear] = useState(initialdata.selectedYear);     // cureent selected year in app
  const [selectedPageMode, setSelectedPageMode] = useState(CALENDER_YEAR);
  const [isMonthSelected, setIsMonthSelected] = useState(false);
  const [isDaySelected, setIsDaySelected] = useState(false);
  const isFocused = useIsFocused();
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [numberOfDaysOfMonth,setNumberOfDaysOfMonth]=useState(null);
  const [productData,setproductData]=useState([]);
  // Used to call this function AddButtonComponentButton pressed by user
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  const handleChildData=(value)=>{
    setproductData([...productData,{inputDetail:value.inputDetail,inputPrice:(parseFloat(value.inputPrice)).toFixed(2)}]);
   
 }
  //called when screen isfocused
  useEffect(() => {
    setSelectedPageMode(CALENDER_YEAR)
    setIsMonthSelected(false)
    setIsDaySelected(false);
  }, [isFocused])

  useEffect(() => {
    setSelectedYear(initialdata.selectedYear);
    setNumberOfDaysOfMonth(daysOfMonthData(initialdata.selectedMonth,initialdata.selectedYear))
  }, [initialdata])

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

  const renderItem=({item})=>(
    console.log(item),
    <ProductComponent data={item}/>
  )


  const renderMonthComponent = ({ item }) => (
    <MonthComponent monthName={item.monthName} amount={item.amount} isPress={(value) => { setIsMonthSelected(value), setSelectedPageMode(CALENDER_YEAR_MONTH)}} />
  );
  const renderDaysComponent = ({ item }) => (
    <DaysComponent item={item} isPress={(value) => { setIsMonthSelected(!value), setIsDaySelected(value), setSelectedPageMode(CALENDER_YEAR_MONTH_DAY) }} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: Colors.pageBackgroundColor }}>
      <Header page={selectedPageMode} ></Header>
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
              <AddNewItem isShowCustomComponent={handleButtonPress} onData={handleChildData} />
            )
          }
          <FlatList showsVerticalScrollIndicator={false} data={productData} renderItem={renderItem} style={{ flex: 1, marginTop: 5 }}></FlatList>
          <View style={styles.subView}>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => handleButtonPress(!showCustomComponent)} activeOpacity={1}>
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
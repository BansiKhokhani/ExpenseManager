import React, { useEffect, useState } from 'react'
import { View,TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import Header from '../../Components/Header/Header';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import Colors from '../../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductComponent from '../../Components/ProductComponent/ProductComponent';
import { dayOfWeek ,date,monthOfYear,year, convertToLocalString } from '../../Components/Helper';
import { ADD, CALENDER_YEAR_MONTH_DAY, EXPENSE, INCOME, TODAY } from '../../Components/constants';
import { useDispatch ,useSelector} from 'react-redux';
import { addExpense, addIncome} from '../../Components/Redux/Action';

export default function Today() {
  const dispatch=useDispatch();
  const todayExpenseData=useSelector(state=>state.expenseReducer[year]?.[monthOfYear]?.[date]);
  const todayIncomeData=useSelector(state=>state.incomeReducer[year]?.[monthOfYear]?.[date]);
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [data,setData]=useState();
  const [isIncomeOrExpense,setIsIncomeOrExpense]=useState(EXPENSE);


  useEffect(()=>{
    if(isIncomeOrExpense==EXPENSE)
        setData(todayExpenseData);
    else 
        setData(todayIncomeData);
    
  },[todayExpenseData,todayIncomeData,isIncomeOrExpense]);

  


  // Used to call this function AddButtonComponentButton pressed by user
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }
  const handleChildData=(value)=>{
    const inputPrice=convertToLocalString(value?.inputPrice);
    const details={inputDetail:value.inputDetail,inputPrice:inputPrice,uniqueId:value.uniqueId};
    if(isIncomeOrExpense==EXPENSE)
      dispatch(addExpense(year, monthOfYear, date, details));
    else
      dispatch(addIncome(year, monthOfYear, date, details));
    
  } 
  const renderItem=({item})=>(
    <ProductComponent data={item} isIncomeExpense={isIncomeOrExpense}/>
  )

  return (
    <View style={styles.mainView}>
      <Header page={TODAY}  isIncomeExpense={(value)=>{setIsIncomeOrExpense(value)}}></Header>
      <View style={{ flex: 1 }}>
        {
          showCustomComponent && (
            <AddNewItem isShowCustomComponent={handleButtonPress} itemType={ADD} onData={handleChildData} editData={null}/>
          )
        }
        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={renderItem} style={{ flex: 1, marginTop: 5 }}></FlatList>
       
        <View style={styles.subView}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => handleButtonPress(!showCustomComponent)} activeOpacity={1}>
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

//https://blog.logrocket.com/use-redux-persist-react-native/
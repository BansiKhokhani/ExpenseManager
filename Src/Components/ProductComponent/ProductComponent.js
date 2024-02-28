import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, deleteIncome, updateExpense, updateIncome } from '../Redux/Action';
import AddNewItem from '../AddNewItems/AddNewItem';
import { EDIT, EXPENSE } from '../constants';


const ProductComponent = ({ data, isIncomeExpense }) => {
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)
  const dispatch = useDispatch();

  const handleDelete = () => {
    //dispatch to delete only one (either income or expence upon unique id)
    dispatch(deleteExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, data?.uniqueId))
    dispatch(deleteIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, data?.uniqueId))
  }

  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  const handleChildData = (value) => {
    const details = { inputDetail: value.inputDetail, inputPrice: (parseFloat(value.inputPrice)).toFixed(2), uniqueId: value.uniqueId };
    if (isIncomeExpense == EXPENSE)
      dispatch(updateExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details))
    else
      dispatch(updateIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, details))
  }

  return (
    <View>
        {
          showCustomComponent && (
            <AddNewItem isShowCustomComponent={handleButtonPress} itemType={EDIT} onData={handleChildData} editData={data} />
          )
        }
        <TouchableOpacity activeOpacity={1} onPress={() => { handleButtonPress(!showCustomComponent) }} style={{ marginHorizontal: 15, marginVertical: 5 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{data?.inputDetail}</Text></View>
            <View><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{data?.inputPrice}</Text></View>
            <TouchableOpacity activeOpacity={1} onPress={handleDelete} style={{ paddingRight: 5, paddingLeft: 15 }}><View><FontAwesome5 name="trash" size={20} color={Colors.whitetextcolor} /></View></TouchableOpacity>
          </View>
          <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
        </TouchableOpacity>
      
    </View>
  )
}

export default ProductComponent

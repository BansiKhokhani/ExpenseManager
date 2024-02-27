import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch ,useSelector} from 'react-redux';
import { deleteExpense, deleteIncome } from '../Redux/Action';


const ProductComponent=(props)=>{
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)
  const dispatch=useDispatch();

  const handleDelete=()=>{
  //dispatch to delete only one (either income or expence upon unique id)
   dispatch(deleteExpense(initialdata.selectedYear,initialdata.selectedMonth,initialdata.selectedDate,props?.data?.uniqueId))
   dispatch(deleteIncome(initialdata.selectedYear,initialdata.selectedMonth,initialdata.selectedDate,props?.data?.uniqueId))
  }
  return (
    <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginVertical: 5 }}>
    <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1}}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{props?.data?.inputDetail}</Text></View>
        <View><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{props?.data?.inputPrice}</Text></View>
        <TouchableOpacity activeOpacity={1} onPress={handleDelete} style={{paddingRight:5,paddingLeft:15}}><View><FontAwesome5 name="trash" size={20} color={Colors.whitetextcolor} /></View></TouchableOpacity>
    </View>
    <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
    </TouchableOpacity>
  )
}

export default ProductComponent

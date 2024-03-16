import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import Colors from '../Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense, deleteIncome} from '../Redux/Action';
import { EXPENSE } from '../constants';


const ProductComponent = ({ data, isIncomeExpense ,isShowCustomComponent,editData}) => {
  const initialdata = useSelector(state => state.selectedDateMonthYearReducer)  // store selected year, month and day
  const dispatch = useDispatch();

  // Delete product
  const handleDelete = () => {
    //dispatch to delete only one (either income or expence upon unique id)
    if (isIncomeExpense == EXPENSE)
      dispatch(deleteExpense(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, data?.uniqueId))
    else
      dispatch(deleteIncome(initialdata.selectedYear, initialdata.selectedMonth, initialdata.selectedDate, data?.uniqueId))
  }

  // call on buttonpress
  const handleButtonPress = (value) => {
    isShowCustomComponent(value)
  }

  return (
   
     
      <TouchableOpacity activeOpacity={1} onPress={() => { handleButtonPress(true) ,editData(data)}} style={styles.touchableOpacity}>
        <View style={styles.wrapper}>
          <View style={{ flex: 1 }}><Text style={styles.text}>{data?.inputDetail}</Text></View>
          <View><Text style={styles.text}>{data?.inputPrice}</Text></View>
          {/* delete product */}
          <TouchableOpacity activeOpacity={1} onPress={handleDelete} style={styles.iconButton}><View><FontAwesome5 name="trash" size={20} color={Colors.whitetextcolor} /></View></TouchableOpacity>
        </View>
        <View style={styles.borderLine}></View>
      </TouchableOpacity>
  )
}
const styles=StyleSheet.create({
  touchableOpacity:{ marginHorizontal: 15, marginVertical: 5 },
  wrapper:{ flexDirection: 'row' },
  text:{ color: Colors.whitetextcolor, fontWeight: 'bold' },
  iconButton:{ paddingRight: 5, paddingLeft: 15 },
  borderLine:{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 },

})
export default ProductComponent;

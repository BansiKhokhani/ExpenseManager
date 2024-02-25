import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { updateselected_Date_Month_Year } from '../Redux/Action';

const DaysComponent = ({ item,isPress}) => {
    const dispatch=useDispatch();
    const {selectedDate,selectedDay,selectedMonth,selectedYear}=useSelector(state=>state.selectedDateMonthYearReducer)
  
    const handleDispatch=(selectedDate,selectedDay,selectedMonth,selectedYear)=>{
      dispatch(updateselected_Date_Month_Year(selectedDate,selectedDay,selectedMonth,selectedYear))
    }
    const AddNewItem = () => (
        isPress(true),
        handleDispatch(item.date,item.day,selectedMonth,selectedYear)
    )

    return (
        <TouchableOpacity activeOpacity={1} onPress={AddNewItem} style={{ marginHorizontal: 15, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.date} - </Text><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{item.day}</Text></View>
                <View>
                    {item.amount>0&&<Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{(parseFloat(item.amount)).toFixed(2)}</Text>}
                </View>
            </View>
            <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
        </TouchableOpacity>
    )
}

export default DaysComponent;

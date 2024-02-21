import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';

const MonthComponent = ({ monthName, amount,isPress }) => {
 

  const showMonthAllDays = () => (
    isPress(true)
  );

  return (

    <TouchableOpacity activeOpacity={1} onPress={showMonthAllDays} style={{ backgroundColor: '#ffff', paddingHorizontal: 10, paddingTop: 10, width: '45%', borderRadius: 5, margin: 10 }}>
      <View style={{ backgroundColor: Colors.topBottomBarcolor, alignItems: 'center', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 20 }}>{monthName}</Text>
      </View>
      <Text style={{ color: Colors.textcolor, textAlign: 'center', paddingVertical: 5, fontWeight: 'bold' }}>{amount}</Text>
    </TouchableOpacity>



  )
}

export default MonthComponent;

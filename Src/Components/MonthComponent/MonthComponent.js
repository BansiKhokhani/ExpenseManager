import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';
import DaysComponent from '../DaysComponent/DaysComponent';

const MonthComponent = ({ monthName, amount }) => {


  //change here for the days display
  const data = [
    { date: '01', day: 'Monday', amount: '0.00' },
    { date: '02', day: 'Monday', amount: '0.00' },
    { date: '03', day: 'Monday', amount: '0.00' },
    { date: '04', day: 'Monday', amount: '0.00' },
    { date: '05', day: 'Monday', amount: '0.00' },
    { date: '06', day: 'Monday', amount: '0.00' },
    { date: '07', day: 'Monday', amount: '0.00' },
    { date: '08', day: 'Monday', amount: '0.00' },
    { date: '09', day: 'Monday', amount: '0.00' },


  ];
  const renderItem = ({ item }) => (
    <DaysComponent />
  );

  const showMonthAllDays = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
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

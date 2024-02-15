import React, { useState } from 'react'
import { View, Text, Button, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../../Components/Header/Header';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import Colors from '../../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Today() {
  const [showCustomComponent, setShowCustomComponent] = useState(false);

  
 
  const CurrentDateAndTime=()=>{
    const currentDate = new Date();
    // Get the current date, month, and year
    const date = currentDate.getDate(); // Get the day of the month (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11). Adding 1 because months are zero-indexed
    const year = currentDate.getFullYear(); // Get the four-digit yea
    const day=currentDate.getDay();
    const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayOfWeekNames[day];

    return {date:date,month:month,year:year,day:dayOfWeek}
  }


  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  return (
    <View style={styles.mainView}>
      <Header page={'Today'} data={{ year: 2024, month: 'january' }}></Header>
      <View style={{ flex: 1, position: 'absolute', zIndex: 2 }}>
        {
          showCustomComponent && (
            <AddNewItem isShowCustomComponent={handleButtonPress} />)
        }
      </View>
      <View style={styles.subView}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={() => handleButtonPress(!showCustomComponent)} activeOpacity={1}>
          <View>
            <AntDesign name="plus" size={25} color={Colors.buttonColor} />
          </View>
        </TouchableOpacity>
      </View>
    </View>


  )
}
const styles = StyleSheet.create({
  mainView:
  {
    flex: 1, backgroundColor: Colors.pageBackgroundColor, zIndex: 1
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
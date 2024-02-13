import React, { useState } from 'react'
import { View, Text, Button, Alert, TouchableOpacity ,StyleSheet} from 'react-native';
import Header from '../../Components/Header/Header';
import AddNewItem from '../../Components/AddNewItem';
import Colors from '../../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Today() {
  const [showCustomComponent, setShowCustomComponent] = useState(false);

  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }

  return (
    
    
    <View style={styles.mainView}>
      <Header page={'Today'}></Header>
      <View style={{flex:1,position:'absolute',zIndex:2}}>
      {
          showCustomComponent && (
            <AddNewItem isShowCustomComponent={handleButtonPress}/>) 
        }
      </View>
      <View style={styles.subView}>
        <TouchableOpacity style={styles.touchableOpacity} onPress={()=>handleButtonPress(!showCustomComponent)} activeOpacity={1}>
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
    flex: 1, backgroundColor: Colors.pageBackgroundColor,zIndex:1
  },
  subView:
  {
     flex: 1, position: 'absolute', right: 8, bottom: 8
    
  },
  touchableOpacity:{
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
import React from 'react'
import {View,Text} from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'

export default function Calender() {
  return (
    <View style={{flex:1,backgroundColor:Colors.pageBackgroundColor}}>
      <Header></Header>
    </View>
      
  )
}

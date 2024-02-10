import React from 'react'
import {View,Text,StatusBar} from 'react-native'
import Colors from '../../Constants/Colors'



export default function Header() {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.topBottomBarcolor}
        barStyle="light-content"
     />
      <View style={{flex:0.15,backgroundColor:Colors.topBottomBarcolor,borderBottomLeftRadius:30,borderBottomRightRadius:30,}}>
          {/* <View style={{flex:1,justifyContent: 'flex-end',}}>
                <Text>income</Text>
          </View> */}
      </View>
        
    </>
  )
}

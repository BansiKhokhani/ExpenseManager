import React from 'react'
import { View,StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'

const Miscellaneous=()=> {
  return (
    <View style={styles.mainView}>
      <View style={{ backgroundColor: 'white', height: '8%' }} />
      <View style={{flex:1}}>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    mainView:
    {
      flex: 1, backgroundColor: Colors.pageBackgroundColor
    }
  })
export default Miscellaneous

import React from 'react'
import { View ,Text} from 'react-native'
import Colors from '../../Components/Colors'


const SplashScreen=()=>{
  return (
    <View style={{flex:1,backgroundColor:Colors.pageBackgroundColor,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Text style={{color:Colors.whitetextcolor,fontSize:30,fontWeight:'bold'}}>Expence Manager</Text>
    </View>
  )
}

export default SplashScreen

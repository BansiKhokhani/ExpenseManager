import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';

const ProductComponent=(props)=>{
    console.log(props);
  return (
    <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginVertical: 5 }}>
    <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1}}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{props?.data?.inputDetail}</Text></View>
        <View><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>{props?.data?.inputPrice}</Text></View>
    </View>
    <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
    </TouchableOpacity>
  )
}

export default ProductComponent

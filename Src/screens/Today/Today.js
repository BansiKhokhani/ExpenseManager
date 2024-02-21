import React, { useState } from 'react'
import { View,TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import Header from '../../Components/Header/Header';
import AddNewItem from '../../Components/AddNewItems/AddNewItem';
import Colors from '../../Constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductComponent from '../../Components/ProductComponent/ProductComponent';
import { dayOfWeek ,date,monthOfYear,year, } from '../../Components/Helper';
import { CALENDER_YEAR_MONTH_DAY, TODAY } from '../../Components/constants';

export default function Today({navigation}) {
  const [showCustomComponent, setShowCustomComponent] = useState(false);
  const [data,setData]=useState([]);

  // Used to call this function AddButtonComponentButton pressed by user
  const handleButtonPress = (value) => {
    setShowCustomComponent(value)
  }
  const handleChildData=(value)=>{
     setData([...data,{inputDetail:value.inputDetail,inputPrice:(parseFloat(value.inputPrice)).toFixed(2)}]);
    
  }
  const renderItem=({item})=>(
    console.log(item),
    <ProductComponent data={item}/>
  )

  return (
    <View style={styles.mainView}>
      <Header page={TODAY} data={{ date: date, month: monthOfYear, year: year, day: dayOfWeek }} onInfo={(value)=>{}}></Header>
      <View style={{ flex: 1 }}>
        {
          showCustomComponent && (
            <AddNewItem isShowCustomComponent={handleButtonPress} onData={handleChildData}/>
          )
        }
        <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={renderItem} style={{ flex: 1, marginTop: 5 }}></FlatList>
       
        <View style={styles.subView}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => handleButtonPress(!showCustomComponent)} activeOpacity={1}>
            <View>
              <AntDesign name="plus" size={25} color={Colors.buttonColor} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainView:
  {
    flex: 1, backgroundColor: Colors.pageBackgroundColor
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
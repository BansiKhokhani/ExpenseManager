import React, { useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { KeyboardAvoidingView } from 'react-native';

export default function Header(props) {
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState('income');   //value= 'income or 'expense
  const changeDateAndTime = () => {
    console.log("changeDateAndTime");
  }

  const selectType = (value) => {
    console.log(value);
    setIsIncomeOrExpense(value);

  }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.topBottomBarcolor}
        barStyle="light-content"
      />
      <View style={{ flex: 0.21}}>
        {(props.page == 'Today'||'Calendar') &&
          <View style={{ flex: 1, alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center',backgroundColor:Colors.topBottomBarcolor,width:'100%',justifyContent:'center',paddingTop:25}} >
              <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity activeOpacity={1} onPress={changeDateAndTime}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
              <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 }}>February </Text>
                  <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 }}>10, </Text>
                  <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 }}>2024</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 25 }}>Wednesday</Text>
                </View>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <TouchableOpacity activeOpacity={1} onPress={changeDateAndTime}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 6 ,backgroundColor:Colors.topBottomBarcolor,width:'100%'}}>
              <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 }}>{isIncomeOrExpense == 'expense' ?'Expense':'Income'}</Text>
              <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 }}>0.00</Text>
            </View>
            {/* expense and income tab */}
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 ,backgroundColor:Colors.topBottomBarcolor,width:'100%',justifyContent:'center',borderBottomLeftRadius: 30, borderBottomRightRadius: 30}}>
              <View style={{paddingRight:80}}>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('expense') }}>
                  <View><Text style={[isIncomeOrExpense == 'expense' ? styles.selectedtype : styles.unSelectedTYpe]}>EXPENSES</Text></View>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity activeOpacity={1} onPress={() => { selectType('income') }}>
                  <View><Text style={[isIncomeOrExpense == 'income' ? styles.selectedtype : styles.unSelectedTYpe]}>INCOME</Text></View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
        

        {/* change here for different page of parameter */}

       


      </View>
    </>
  )
}
const styles = StyleSheet.create({
  selectedtype: {
    fontWeight: 'bold', fontSize: 18,
    color: Colors.whitetextcolor,
    borderBottomWidth: 2,
    borderColor: Colors.whitetextcolor
  },
  unSelectedTYpe: {
    fontWeight: 'bold', fontSize: 18,
  }
})
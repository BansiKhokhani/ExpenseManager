import React, { useState } from 'react'
import { View, Text, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../../Constants/Colors'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TODAY ,CALENDER_YEAR,CALENDER_YEAR_MONTH,CALENDER_YEAR_MONTH_DAY} from '../constants';

export default function Header(props) {
  const [isIncomeOrExpense, setIsIncomeOrExpense] = useState('income');   //value= 'income or 'expense
  const changeDateAndTime = () => {
    console.log(props?.data?.month);
  }

  const selectType = (value) => {
    console.log(value);
    setIsIncomeOrExpense(value);

  }

  // const d={
  //   2024:{
  //     January:{ 
  //       1:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}],2:[{inputdetail:'grocery',inputPrice:10.00},{inputdetail:'grocery',inputPrice:10.00}]}},
        
  //   }
  // }

  return (
    <>
      <StatusBar
        backgroundColor={Colors.topBottomBarcolor}
        barStyle="light-content"
      />
      <>
        {(props.page == TODAY || props.page == CALENDER_YEAR_MONTH_DAY) &&
          <View style={styles.mainView}>
            <View style={styles.calenderMainView} >
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeDateAndTime}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
              <View style={styles.dateMainView}>
                <View style={styles.dateSubView}>
                  <Text style={styles.text}>{props?.data?.month} </Text>
                  <Text style={styles.text}>{props?.data?.date}, </Text>
                  <Text style={styles.text}>{props?.data?.year}</Text>
                </View>
                <View style={styles.dayView}>
                  <Text style={[styles.text, { fontSize: 25 }]}>{props?.data?.day}</Text>
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={()=> props.page==CALENDER_YEAR_MONTH_DAY && changeDateAndTime}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == 'expense' ? 'Expense' : 'Income'}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
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

        {(props.page == CALENDER_YEAR || props.page ==CALENDER_YEAR_MONTH) &&
          <View style={styles.mainView}>
            <View style={styles.calenderMainView} >
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeDateAndTime}><AntDesign name="caretleft" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
              <View style={styles.dateMainView}>
                <View style={styles.dateSubView}>
                  <Text style={[styles.text, props.page == 'CalenderWithYear' && { fontSize: 35 }]}>{props?.data?.year}</Text>
                </View>
                <View style={styles.dayView}>
                  {props.page=='CalenderWithMonth_Year'&&<Text style={[styles.text, { fontSize: 35 }]}>{props?.data?.month}</Text>}
                </View>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity activeOpacity={1} onPress={changeDateAndTime}><AntDesign name="caretright" size={45} color={Colors.whitetextcolor} /></TouchableOpacity>
              </View>
            </View>
            <View style={styles.showincomeExpensePriceView}>
              <Text style={styles.text}>{isIncomeOrExpense == 'expense' ? 'Expense' : 'Income'}</Text>
              <Text style={styles.text}>0.00</Text>
            </View>

            <View style={styles.incomeExpenseTabView}>
              <View style={{ paddingRight: 80 }}>
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
      </>
    </>
  )
}
const styles = StyleSheet.create({
  
  mainView: { alignItems: 'center' },
  calenderMainView: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.topBottomBarcolor, width: '100%', justifyContent: 'center', paddingTop: 25 },
  buttonView: { paddingHorizontal: 10 },
  dateMainView: { alignItems: 'center' },
  dateSubView: { flexDirection: 'row' },
  text: { color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 15 },
  dayView: { alignItems: 'center' },
  showincomeExpensePriceView: { alignItems: 'center', paddingTop: 6, backgroundColor: Colors.topBottomBarcolor, width: '100%' },
  incomeExpenseTabView: { flexDirection: 'row',alignItems: 'center', paddingBottom: 5, backgroundColor: Colors.topBottomBarcolor, width: '100%', justifyContent: 'center', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  selectedtype: {
    fontWeight: 'bold', fontSize: 18,
    color: Colors.whitetextcolor,
    borderBottomWidth: 2,
    borderColor: Colors.whitetextcolor
  },
  unSelectedTYpe: {
    fontWeight: 'bold', fontSize: 18,
    color:Colors.Platinumtextcolor
  }
})
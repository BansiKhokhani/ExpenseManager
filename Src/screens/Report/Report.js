import React ,{useState}from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import Header from '../../Components/Header/Header'
import Colors from '../../Constants/Colors'
import { REPORT_CALENDER_YEAR, REPORT_CALENDER_YEAR_MONTH, INCOME, EXPENSE, TOTAL } from '../../Components/constants'
import TotalIncomeExpenseComponent from '../../Components/totalIncomeExpenseComponent/totalIncomeExpenseComponent'
import MonthComponent from '../../Components/MonthComponent/MonthComponent'
const Report = () => {
  const [selectedPageMode,setSelectedPageMode]=useState(REPORT_CALENDER_YEAR)
  const data = [
    { id: '1', monthName: 'January'},
    { id: '2', monthName: 'February'},
    { id: '3', monthName: 'March'},
    { id: '4', monthName: 'April'},
    { id: '5', monthName: 'May'},
    { id: '6', monthName: 'June'},
    { id: '7', monthName: 'July' },
    { id: '8', monthName: 'August'},
    { id: '9', monthName: 'September'},
    { id: '10', monthName: 'October'},
    { id: '11', monthName: 'November'},
    { id: '12', monthName: 'December',},
  ];

  const renderMonthComponent = ({ item }) => (
    <MonthComponent page={selectedPageMode} monthName={item.monthName} isIncomeOrExpense={null} isPress={(value) => {setSelectedPageMode(REPORT_CALENDER_YEAR_MONTH)}} />
  );

  return (
    <View style={styles.mainView}>
      {/* add banner ads */}
      <View style={{ backgroundColor: 'white', height: '8%' }} />
      {/* add report */}
      <Header page={selectedPageMode} isIncomeExpense={() => { }} />
      <View style={{ flex: 1, paddingHorizontal: 20,paddingTop:20 }}>
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <TotalIncomeExpenseComponent color={Colors.whitetextcolor}/>
        </View>
        {/* month display */}
        <View style={{ borderWidth: 1, borderColor: 'white' }} />
        {selectedPageMode==REPORT_CALENDER_YEAR && <View style={{flex:1}}>
          <FlatList
              data={data}
              renderItem={renderMonthComponent}
              showsVerticalScrollIndicator={false}
            />
        </View>}
        
        
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
export default Report;
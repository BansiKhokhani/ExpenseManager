import React from 'react'
import { View, Image, StatusBar, Dimensions,StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
const { width:width, height:height } = Dimensions.get('window')


export default SwiperComponent=()=> {
  
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={styles.dotView}
            />
          }
          activeDot={
            <View
              style={styles.activeDotView}
            />
          }
          paginationStyle={{
            bottom: 70
          }}
          loop={false}
        >
          <View style={styles.slide}>
            <Text style={styles.titleText}>Add and Delete Item</Text>
            <Image
              style={styles.image}
              source={require('../../../assets/Images/IncomeExpenseImg_1.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
          <Text style={styles.titleText}>Edit Item</Text>
            <Image
              style={styles.image}
              source={require('../../../assets/Images/IncomeExpenseImg_2.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
          <Text style={styles.titleText}>Download Excel(.xlsx) File</Text>
            <Image style={styles.image} source={require('../../../assets/Images/IncomeExpenseImg_3.png')} />
          </View>
        </Swiper>
      </View>
    )
  
}
const styles =  StyleSheet.create({
  wrapper: {
    justifyContent:'center',
    alignItem:'center',
    alignContent:'center',
    marginHorizontal:width/(6.5),
  },

  slide: {
    marginTop:20,
    justifyContent:'center',
    alignItem:'center',
    alignContent:'center'
    
  },
  container: {
    flex: 1,
    justifyContent:'center',
    alignItem:'center',
    alignContent:'center'
  },
  dotView:{
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
  activeDotView:{
    backgroundColor: '#fff',
    width: 13,
    height: 13,
    borderRadius: 7,
    marginLeft: 7,
    marginRight: 7
  },
 image: {
   width:width/1.4,
    height:height/1.3,
  },
  titleText:{textAlign: 'left',fontSize:22, color: Colors.whitetextcolor,fontWeight: 'bold'}
})

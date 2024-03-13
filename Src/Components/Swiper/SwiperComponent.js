import React, { Component } from 'react'
import { View, Image, StatusBar, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width, height } = Dimensions.get('window')

const styles = {
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
 image: {
   width:270,
    height:600,
  }
}

export default SwiperComponent=()=> {
  
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.wrapper}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,.3)',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#fff',
                width: 13,
                height: 13,
                borderRadius: 7,
                marginLeft: 7,
                marginRight: 7
              }}
            />
          }
          paginationStyle={{
            bottom: 70
          }}
          loop={false}
        >
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('../../../assets/Images/IncomeExpenseImg_1.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
            <Image
              style={styles.image}
              source={require('../../../assets/Images/IncomeExpenseImg_2.png')}
              resizeMode="cover"
            />
          </View>
          <View style={styles.slide}>
            <Image style={styles.image} source={require('../../../assets/Images/IncomeExpenseImg_3.png')} />
          </View>
        </Swiper>
      </View>
    )
  
}
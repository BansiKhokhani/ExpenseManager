// In App.js in a new project
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './Src/Components/Colors';
import Calendar from './Src/screens/Calender/Calender';
import Today from './Src/screens/Today/Today';
import Report from './Src/screens/Report/Report'
import Miscellaneous from './Src/screens/Miscellaneous/Miscellaneous';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();

const navigationContainer=()=>{
  return (
    <NavigationContainer>
      <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarStyle: {backgroundColor: Colors.topBottomBarcolor,borderTopWidth:0},
            tabBarHideOnKeyboard:true,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Today') {
                iconName = focused
                  ? 'today'
                  : 'today-outline';
                  return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === 'Calendar') {
                iconName = focused ? 'calendar' : 'calendar-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              }
              else if(route.name==='Report'){
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                return <Ionicons name={iconName} size={size} color={color} />;
              }
              else if(route.name==='Miscellaneous'){
                iconName = focused ? 'miscellaneous-services' : 'miscellaneous-services';
                return <MaterialIcons name={iconName} size={size} color={color} />;
              }

             
              
            },
            tabBarActiveTintColor:Colors.tabBarActiveColor,
            tabBarInactiveTintColor:Colors.tabBarInActiveColor,
            
          })}
      >
           <Tab.Screen
            name="Today"
            component={Today} 
            options={{ headerShown:false
            
          }}
          />
          <Tab.Screen
            name="Calendar"
            component={Calendar}  
            options={{headerShown:false}}
          />
           <Tab.Screen
            name="Report"
            component={Report}  
            options={{headerShown:false}}
          />
          <Tab.Screen
            name="Miscellaneous"
            component={Miscellaneous}  
            options={{headerShown:false}}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default navigationContainer;


// https://www.browserstack.com/guide/how-to-make-react-native-app-responsive

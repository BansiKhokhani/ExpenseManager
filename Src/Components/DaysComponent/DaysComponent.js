import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../../Constants/Colors';

const DaysComponent = ({ monthname }) => {
    //     let birthday = new Date('2024-02-13');
    // // Get the day of the week as a number (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
    // const dayOfWeekNumber = birthday.getDay();

    // // Convert the day of the week number to the corresponding day name
    // const dayOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const dayOfWeek = dayOfWeekNames[dayOfWeekNumber];
    // console.log(dayOfWeek);
    const AddNewItem = () => (
        console.log('add new item')
    )

    return (
        <TouchableOpacity activeOpacity={1} onPress={AddNewItem} style={{ marginHorizontal: 15, marginVertical: 5 }}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>01 - </Text><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>Monday</Text></View>
                <View><Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold' }}>0.00</Text></View>
            </View>
            <View style={{ flex: 1, borderWidth: 0.3, borderColor: 'white', marginTop: 10 }}></View>
        </TouchableOpacity>
    )
}

export default DaysComponent;

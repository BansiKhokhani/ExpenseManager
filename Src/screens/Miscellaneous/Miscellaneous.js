import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, FlatList } from 'react-native'
import Colors from '../../Constants/Colors'
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Toast from 'react-native-simple-toast';
import {objectOfYear} from './../../Components/Helper';

const Miscellaneous = () => {
    const [isExportFile, setIsExportFile] = useState(false);
    const [isHelp, setIsHelp] = useState(false);
    const [isRateUs, setIsRateUs] = useState(false);
    const [isButtonShow, setIsButtonShow] = useState(true);
    const [yearData, setYearData] = useState();
    const [selectedYear,setSelectedYear]=useState();



    // function to handle exporting
    const exportDataToExcel = () => {

        // Created Sample data
        let sample_data_to_export = [{ id: '1', name: 'Bansi' }, { id: '2', name: 'Ketan' }];
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(sample_data_to_export)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

        // Write generated excel to Storage

        RNFS.writeFile(RNFS.DownloadDirectoryPath + '/ExpenseIncomeDataFile.xlsx', wbout, 'ascii').then((r) => {
            Toast.show('Successfully Downloaded!', Toast.LONG);

        }).catch((e) => {
            console.log('Error', e);
        });

    }
    const handleClick = async () => {
        console.log('hello')

        try {
            // Check for Permission (check if permission is already given or not)
            let isPermitedExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

            if (!isPermitedExternalStorage) {

                // Ask for permission
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage permission needed",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );


                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // Permission Granted (calling our exportDataToExcel function)
                    exportDataToExcel();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our exportDataToExcel function)
                exportDataToExcel();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }
    }
    return (
        <View style={styles.mainView}>
            {/* add banner ads */}
            <View style={{ backgroundColor: 'white', height: '8%' }} />
            <View style={styles.subView}>

                {isButtonShow && <><TouchableOpacity onPress={() => { setIsExportFile(true), setIsButtonShow(false) ,setYearData(objectOfYear()),setSelectedYear}} style={styles.button}>
                    <Text style={styles.text}>Export Excel</Text>
                </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.button}>
                        <Text style={styles.text}> Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }} style={styles.button}>
                        <Text style={styles.text}> Rate Us</Text>
                    </TouchableOpacity></>}
                {isExportFile &&
                    <>
                        <Text style={{ color: Colors.whitetextcolor, fontWeight: 'bold', fontSize: 20 }}>SELECT YEAR:</Text>
                        <View style={{ flex: 0.3,width:'40%'}}>
                            <FlatList
                                data={yearData}
                                renderItem={({ item }) => (
                                    <TouchableOpacity activeOpacity={1} onPress={()=>{setSelectedYear(item.year)}}>
                                        {console.log(".."+selectedYear)}
                                        <Text style={[(selectedYear==item.year?styles.selectedYearText:styles.unSelectedYearText)]}>{item.year}</Text>
                                        <View style={{borderWidth:0.2,borderColor:'#ffff',width:'100%'}}/>
                                    </TouchableOpacity>
                                )} 
                                showsVerticalScrollIndicator={false}
                                />
                        </View>
                        <TouchableOpacity onPress={handleClick} style={styles.button}>
                            <Text style={styles.text}> Export</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    mainView:
    {
        flex: 1, backgroundColor: Colors.pageBackgroundColor
    },
    subView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,

    },
    button: {
        width: '50%',
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: Colors.textcolor,
        marginVertical: 20,
        borderRadius: 5,
        borderColor: Colors.whitetextcolor,
        borderWidth: 3

    },
    text: { textAlign: 'center', color: Colors.whitetextcolor, fontWeight: 'bold' },
    unSelectedYearText:{textAlign:'center',paddingVertical:10,color:Colors.whitetextcolor,fontWeight:'bold'},
    selectedYearText:{textAlign:'center',paddingVertical:10,color:Colors.textcolor,backgroundColor:Colors.whitetextcolor,fontWeight:'bold'},
})
export default Miscellaneous;


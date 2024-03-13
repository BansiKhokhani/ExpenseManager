import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, FlatList } from 'react-native'
import Colors from '../../Constants/Colors'
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Toast from 'react-native-simple-toast';
import { indexOfMonth, objectOfYear, convertToNormalNumber, convertToLocalString } from './../../Components/Helper';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector, useDispatch } from 'react-redux';
import { EXPENSE, INCOME } from '../../Components/constants';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8955881905609463/6363795382';  //banner ads

const Miscellaneous = () => {
    const [isExportFile, setIsExportFile] = useState(false);
    const [isHelp, setIsHelp] = useState(false);
    const [isRateUs, setIsRateUs] = useState(false);
    const [isButtonShow, setIsButtonShow] = useState(true);
    const [yearData, setYearData] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const expenseData = useSelector(state => state.expenseReducer);
    const incomeData = useSelector(state => state.incomeReducer);
    const [totalExpense,setTotalExpense]=useState(0);

    const handleData = (month, data, type) => {
        


        
        const sampleData = [
            type == 'EXPENSE' && [`${month}`, `${selectedYear}`],
            ['DATE', `DETAIL OF ${type}`, 'AMOUNT']
        ];
        let total = 0;
        for (const datekey in data) {
            data?.[datekey]?.filter(item => {
                const date = `${datekey}-${indexOfMonth(month) + 1}-${selectedYear}`;
                sampleData.push([date, item.inputDetail, item.inputPrice]);
                total += convertToNormalNumber(item?.inputPrice);
            })
        }
       if(type=='EXPENSE'&&total>0)
       {
            setTotalExpense(total);
       }

        sampleData.push(['', `TOTAL ${type}`, convertToLocalString(total)])
        type=='INCOME'&& sampleData.push(['', 'TOTAL EXPENSE', convertToLocalString(totalExpense)],['','BALANCE',`${total-totalExpense}`])
        return sampleData;
    }

    // function to handle exporting
    const exportDataToExcel = async () => {
        const expensedata = expenseData?.[selectedYear];
        const incomedata = incomeData?.[selectedYear];
        if (expensedata || incomedata) {

            let combinedOMonthKey = null;
            if (expensedata && incomedata) {
                const expenseKeys = Object.keys(expensedata);
                const incomeKeys = Object.keys(incomedata);
                const combinedSet = new Set([...expenseKeys, ...incomeKeys]);
                combinedOMonthKey = Array.from(combinedSet);
            }
            else if (incomedata) {
                const incomeKeys = Object.keys(incomedata);
                combinedOMonthKey = incomeKeys;
            }
            else {
                const expenseKeys = Object.keys(expensedata);
                combinedOMonthKey = expenseKeys;
            }
            // console.log(combinedOMonthKey)

            let wb = XLSX.utils.book_new();
            for (const monthKey in combinedOMonthKey) {
                const month = combinedOMonthKey[monthKey];
                const expense = handleData(month, expensedata?.[month], 'EXPENSE');
                const income = handleData(month, incomedata?.[month], 'INCOME');
                const ws = XLSX.utils.aoa_to_sheet([]);
                ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 30 }, { wch: 5 }, { wch: 10 }, { wch: 30 }, { wch: 30 }]; // set a cell width
                XLSX.utils.sheet_add_aoa(ws, expense, { origin: 'A2' });
                XLSX.utils.sheet_add_aoa(ws, income, { origin: 'E2' });
                XLSX.utils.book_append_sheet(wb, ws, `${month}`);
            }

            // Convert workbook to binary Excel format
            const wbout = XLSX.write(wb, { type: 'binary' });


            await RNFS.writeFile(RNFS.DownloadDirectoryPath + `/ExpenseIncomeDataFile${selectedYear}.xlsx`, wbout, 'ascii').then((r) => {
                Toast.show('Successfully Downloaded!', Toast.LONG);

            }).catch((e) => {
                console.log('Error', e);
                Toast.show(`Sorry! you can't download`, Toast.LONG);
            });
        }
        else {
            Toast.show(`Sorry! No Data Found`, Toast.SHORT);
        }

    }
    const handleClick = async () => {
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
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <View style={styles.subView}>
                {isButtonShow && <><TouchableOpacity onPress={() => { setIsExportFile(true), setIsButtonShow(false), setYearData(objectOfYear()), setSelectedYear }} style={styles.button}>
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
                        <View style={{ flex: 0.3, width: '40%' }}>
                            <FlatList
                                data={yearData}
                                renderItem={({ item }) => (
                                    <TouchableOpacity activeOpacity={1} onPress={() => { setSelectedYear(item.year) }}>

                                        <Text style={[(selectedYear == item.year ? styles.selectedYearText : styles.unSelectedYearText)]}>{item.year}</Text>
                                        <View style={{ borderWidth: 0.2, borderColor: '#ffff', width: '100%' }} />
                                    </TouchableOpacity>
                                )}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                        <TouchableOpacity onPress={() => { !selectedYear ? Toast.show(`Select the year!`, Toast.LONG) : handleClick() }} style={styles.button}>
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
    unSelectedYearText: { textAlign: 'center', paddingVertical: 10, color: Colors.whitetextcolor, fontWeight: 'bold' },
    selectedYearText: { textAlign: 'center', paddingVertical: 10, color: Colors.textcolor, backgroundColor: Colors.whitetextcolor, fontWeight: 'bold' },
})
export default Miscellaneous;


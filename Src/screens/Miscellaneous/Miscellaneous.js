import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, PermissionsAndroid, FlatList, Linking ,BackHandler} from 'react-native'
import Colors from '../../Constants/Colors'
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import Toast from 'react-native-simple-toast';
import { indexOfMonth, objectOfYear, convertToNormalNumber, convertToLocalString } from './../../Components/Helper';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { EXPENSE, INCOME } from '../../Components/constants';
import SwiperComponent from '../../Components/Swiper/SwiperComponent';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8955881905609463/6363795382';  //banner ads

const Miscellaneous = () => {
    const [isExportFile, setIsExportFile] = useState(false);
    const [isHelp, setIsHelp] = useState(false);
    const [isButtonShow, setIsButtonShow] = useState(true);
    const [yearData, setYearData] = useState();
    const [selectedYear, setSelectedYear] = useState();
    const expenseData = useSelector(state => state.expenseReducer);
    const incomeData = useSelector(state => state.incomeReducer);
    const isFocused = useIsFocused();
    const [stack, setstack] = useState([]);
    
    useEffect(() => {
        const backAction = () => {
          if (stack.length > 0) {
            setIsButtonShow(true);
            setIsExportFile(false);
            setIsHelp(false);
            let newStack=[...stack];
            newStack.splice((stack.length - 1),1);
            setstack(newStack);
           return true //return false when finally need to close app
          }
          else
          {
            return false;
          }
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove();
    
      }, [stack]);


    useEffect(()=>{
        setstack([])
        setIsButtonShow(true);
        setIsHelp(false);
        setIsExportFile(false);
    },[isFocused])
    const handleData = (month, expenseData, incomeData) => {

        const data = [['EXPENSE', expenseData], ['INCOME', incomeData]];
        let finalExpenseData = [
            [`${month}`, `${selectedYear}`],
            ['DATE', 'DETAIL OF EXPENSE', 'AMOUNT']
        ];
        let finalIncomeData = [
            ['DATE', 'DETAIL OF INCOME', 'AMOUNT']
        ]
        let totalExpense = 0;
        data.filter(incomeExpenseData => {
            const finalData = [];
            let total = 0;
            for (const datekey in incomeExpenseData[1]) {
                incomeExpenseData[1]?.[datekey]?.filter(item => {
                    const date = `${datekey}-${indexOfMonth(month) + 1}-${selectedYear}`;
                    finalData.push([date, item.inputDetail, item.inputPrice]);
                    total += convertToNormalNumber(item?.inputPrice);
                })
            }
            if (incomeExpenseData[0] === 'EXPENSE') {
                totalExpense = total;
                finalExpenseData = finalExpenseData.concat(finalData);
                finalExpenseData.push(['', `TOTAL EXPENSE`, convertToLocalString(total)])
            }
            else {
                finalIncomeData = finalIncomeData.concat(finalData);
                finalIncomeData.push(['', `TOTAL INCOME`, convertToLocalString(total)], ['', 'TOTAL EXPENSE', convertToLocalString(totalExpense)], ['', 'BALANCE', `${total - totalExpense}`])
            }
        })


        return { finalExpenseData, finalIncomeData };
    }

    // function to handle exporting
    const ExcelFileOperation = async () => {
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
                const { finalExpenseData: expense, finalIncomeData: income } = handleData(month, expensedata?.[month], incomedata?.[month]);
                const ws = XLSX.utils.aoa_to_sheet([]);
                ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 30 }, { wch: 5 }, { wch: 10 }, { wch: 30 }, { wch: 30 }]; // set a cell width
                XLSX.utils.sheet_add_aoa(ws, expense, { origin: 'A2' });
                XLSX.utils.sheet_add_aoa(ws, income, { origin: 'E3' });
                XLSX.utils.book_append_sheet(wb, ws, `${month}`);
            }

            // Convert workbook to binary Excel format
            const wbout = XLSX.write(wb, { type: 'binary' });
            const filePath=RNFS.DownloadDirectoryPath + `/ExpenseIncomeDataFile${selectedYear}.xlsx`;
            const exists = await RNFS.exists(filePath); 
            if(exists)
                await RNFS.unlink(filePath);
           
            await RNFS.writeFile(filePath, wbout, 'ascii').then((r) => {
                Toast.show('Successfully Downloaded!', Toast.SHORT);

            }).catch((e) => {
                console.log('Error', e);
                Toast.show(`Sorry! you can't download`, Toast.SHORT);
                //RNFS.writeFile(RNFS.DocumentDirectoryPath + `/ExpenseIncomeDataFile${selectedYear}.xlsx`, wbout, 'ascii').then((r) => {}).catch((e) => {});;
            });
        }
        else {
            Toast.show(`Sorry! No Data Found`, Toast.SHORT);
        }

    }
    const SaveDataToExcel = async () => {
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
                    // Permission Granted (calling our ExcelFileOperation function)
                    ExcelFileOperation();
                    console.log("Permission granted");
                } else {
                    // Permission denied
                    console.log("Permission denied");
                }
            } else {
                // Already have Permission (calling our ExcelFileOperation function)
                ExcelFileOperation();
            }
        } catch (e) {
            console.log('Error while checking permission');
            console.log(e);
            return
        }
    }


   

    const handleRateUs = () => {
        const appPackageName = "com.bricks.wall.balls.shooter"; // Replace with your app's package name
      const playStoreUrl = `https://play.google.com/store/apps/details?id=${appPackageName}`;
      Linking.openURL(playStoreUrl)
        .catch(err => console.error('An error occurred', err));
    };


    return (
        <View style={styles.mainView}>
            {/* add banner ads */}
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            />
            <View style={styles.subView}>
                {isButtonShow && <>
                    <TouchableOpacity onPress={() => { setIsExportFile(true), setIsButtonShow(false), setYearData(objectOfYear()),setstack(['Main Page']) }} style={styles.button}>
                        <Text style={styles.text}>Export Excel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsButtonShow(false), setIsHelp(true),setstack(['Main Page'])}} style={styles.button}>
                        <Text style={styles.text}> Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRateUs} style={styles.button }>
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
                        <TouchableOpacity onPress={() => { !selectedYear ? Toast.show(`Select the year!`, Toast.SHORT) : SaveDataToExcel() }} style={styles.button}>
                            <Text style={styles.text}> Export</Text>
                        </TouchableOpacity>
                    </>
                }
                {isHelp &&
                    <SwiperComponent/>
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


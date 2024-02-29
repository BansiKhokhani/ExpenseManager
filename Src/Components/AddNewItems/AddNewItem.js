import React, { useState, useRef, useEffect } from 'react'
import { Button, SafeAreaView, StyleSheet, Modal, View, TextInput, Dimensions, StatusBar, Text, TouchableOpacity, Keyboard } from 'react-native'
import Colors from '../../Constants/Colors';
import Toast from 'react-native-simple-toast';
import { convertToNormalNumberString, generateUniqueId } from '../Helper';
import { ADD, EDIT } from './../constants'
const { width } = Dimensions.get("window");


const AddNewItem = ({ isShowCustomComponent, itemType, onData, editData }) => {
    const textInputDetailRef = useRef(null);
    const textInputPriceRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(true);
    const [inputDetail, setinputDetail] = useState("");
    const [inputPrice, setinputPrice] = useState("");

    useEffect(() => {
        setinputDetail(editData?.inputDetail);
        setinputPrice(convertToNormalNumberString(editData?.inputPrice));//hello
    }, [editData])

    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible),
        isShowCustomComponent(!isModalVisible)
    }

    const sendDataToParent = () => {
        if (inputDetail.length <= 0 && inputPrice == null) {
            Toast.show('Please Enter the Detail and Price.', Toast.LONG);
            textInputDetailRef.current.focus();
        }
        else if (inputDetail.length <= 0) {
            Toast.show('Please Enter the Detail.');
            textInputDetailRef.current.focus();
        }
        else if (inputPrice == null) {
            Toast.show('Please Enter the price.');
            textInputPriceRef.current.focus();
        }
        else {
           
            Toast.show(itemType == ADD ? 'Added!' : 'Edited!');
            let uniqueId = null;
            itemType == ADD ? uniqueId = generateUniqueId() : (uniqueId = editData?.uniqueId);
            console.log(inputPrice)
            const data = { inputDetail, inputPrice, uniqueId };
            console.log(inputPrice)
            onData(data);
            setinputDetail("");
            setinputPrice();
            textInputDetailRef.current.focus();
        }
        if (itemType == EDIT) {
            setModalVisible(!isModalVisible),
                isShowCustomComponent(!isModalVisible)
        }

    }

    return (
        <View >
            <Modal
                animationType="slide"
                transparent visible={isModalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <>
                            <Text style={styles.headerText}>{itemType === ADD ? 'ADD NEW ITEM' : 'EDIT ITEM'}</Text>
                            <View style={{ marginVertical: 8 }}>
                                <View style={[styles.dataView, { marginVertical: 2 }]}>
                                    <Text style={styles.titileText}>Detail:</Text>
                                    <TextInput placeholder="Enter Detail...."
                                        value={inputDetail} style={styles.textInput}
                                        onChangeText={(value) => { setinputDetail(value) }} ref={textInputDetailRef} />
                                </View>
                                <View style={styles.dataView}>
                                    <Text style={styles.titileText}>Price:</Text>
                                    <TextInput placeholder="Enter Price...."
                                        value={inputPrice} style={styles.textInput}
                                        keyboardType="numeric"
                                        onChangeText={(value) => { (/^\d*\.?\d*$/.test(value)&& value.length<=10) && setinputPrice(value); }} ref={textInputPriceRef} />
                                </View>
                            </View>
                        </>

                        {/** This button is responsible to close the modal */}
                        <View style={styles.buttonView}>
                            <TouchableOpacity activeOpacity={1} onPress={sendDataToParent} style={styles.touchableOpacity}><Text style={styles.touchableOpacityText}>{itemType === ADD ? 'ADD' : 'EDIT'}</Text></TouchableOpacity>
                            <TouchableOpacity activeOpacity={1} onPress={toggleModalVisibility} style={styles.touchableOpacity}><Text style={styles.touchableOpacityText}>CANCEL</Text></TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    )
}
// These are user defined styles 
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.popupbackgroundcolor
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 205,
        width: width * 0.8,
        backgroundColor: Colors.popupbackgroundcolor,
        borderRadius: 7,
        paddingTop: 10,
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 20,
        color: Colors.textcolor
    },
    textInput: {
        width: "75%",
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 16,
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1,
        //marginVertical: 8,
        color: Colors.textcolor,
        fontSize: 15,

    },
    buttonView:
    {
        flexDirection: 'row',
    },
    touchableOpacity:
    {
        width: 100,
        backgroundColor: Colors.buttonColor,
        margin: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    touchableOpacityText:
    {
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 15,
        fontWeight: 'bold'
    },
    dataView: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
    titileText: { fontSize: 15, fontWeight: 'bold', color: Colors.textcolor, width: 60 }
});
export default AddNewItem;
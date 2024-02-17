import React, { useEffect, useState, useRef } from 'react'
import {Button, SafeAreaView, StyleSheet, Modal,View, TextInput, Dimensions, StatusBar, Text, TouchableOpacity} from 'react-native'
import Colors from '../../Constants/Colors';
const { width } = Dimensions.get("window");


const AddNewItem = ({ isShowCustomComponent, onData }) => {
    const textInputRef = useRef(null);
    const [isModalVisible, setModalVisible] = useState(true);
    const [inputDetail, setinputDetail] = useState("");
    const [inputPrice, setinputPrice] = useState();

    const toggleModalVisibility = () => {
        setModalVisible(!isModalVisible),
        isShowCustomComponent(!isModalVisible)
    }

    const sendDataToParent = () => {
        const data = { inputDetail, inputPrice };
        onData(data);
        setinputDetail("");
        setinputPrice("");
        textInputRef.current.focus();
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
                            <Text style={styles.headerText}>ADD NEW ITEM</Text>
                            <View style={{ marginVertical: 8 }}>
                                <View style={[styles.dataView, { marginVertical: 2 }]}>
                                    <Text style={styles.titileText}>Detail:</Text>
                                    <TextInput placeholder="Enter Detail...."
                                        value={inputDetail} style={styles.textInput}
                                        onChangeText={(value) => setinputDetail(value)} ref={textInputRef} />
                                </View>
                                <View style={styles.dataView}>
                                    <Text style={styles.titileText}>Price:</Text>
                                    <TextInput placeholder="Enter Price...."
                                        value={inputPrice} style={styles.textInput}
                                        onChangeText={(value) => {setinputPrice(value)}} />
                                </View>
                            </View>
                        </>

                        {/** This button is responsible to close the modal */}
                        <View style={styles.buttonView}>
                            <TouchableOpacity onPress={sendDataToParent} style={styles.touchableOpacity}><Text style={styles.touchableOpacityText}>ADD</Text></TouchableOpacity>
                            <TouchableOpacity onPress={toggleModalVisibility} style={styles.touchableOpacity}><Text style={styles.touchableOpacityText}>CANCEL</Text></TouchableOpacity>
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
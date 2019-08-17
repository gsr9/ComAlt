import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    Button,
    Picker,
    Alert,
    Modal
} from 'react-native';

const EditDetail = (props) => {
    console.log(props)
    return (
        <Modal
            animationType='slide'
            transparent={false}
            visible={props.visible}
            onRequestClose={() => {
                console.log('Cerrando el modal')
            }}>
            <View style={{ margin: 20 }}>
                <View style={{ backgroundColor: 'red', height: '100%', display: 'flex', flexDirection: 'row' }}>
                    <View>
                        <View style={styles.mainBorder}>
                            <View style={styles.picto}>
                                <Image source={props.children.img} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                            <Text style={styles.pictoText} numberOfLines={1}>{props.children.text}</Text>
                        </View>
                        <View style={{ backgroundColor: 'green', flex: 1, marginTop: 10 }}>

                        </View>
                    </View>
                    <View style={{ backgroundColor: 'yellow', flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                        <View style={{backgroundColor: 'blue', width: '85%'}}>
                            <TouchableHighlight style={styles.optionButton}>
                                <Text style={styles.optionBtnText}> Cambiar imagen </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.optionButton}>
                                <Text style={styles.optionBtnText}> Cambiar texto </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.optionButton}>
                                <Text style={styles.optionBtnText}> Cambiar sonido </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.optionButton}>
                                <Text style={styles.optionBtnText}> Cambiar pictograma </Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight
                            style={{ marginLeft: 'auto', marginRight: 10 }}
                            onPress={() => {
                                props.setVisibility(!props.visible);
                            }}>
                            <Text style={styles.pictoText}>Hide Modal</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const rem = deviceWidth / 64;
const heightCoef = deviceHeight < 400 ? 0.65 : 0.85

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picto: {
        width: deviceWidth / 5,// (Dimensions.get('window').scale + 3.3),
        height: (deviceHeight / 3) * heightCoef,
        backgroundColor: 'white'
    },
    actionBtns: {
        height: deviceHeight / 12,
        width: deviceHeight / 12
    },
    mainBorder: {
        borderColor: 'black',
        borderWidth: 3,
        maxHeight: '34%'
    },
    pictoText: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 20,
        backgroundColor: 'white'
    },
    optionButton: {
        backgroundColor: 'lightblue',
        borderRadius: 15,
        padding: 5,
        marginTop: 40,
        marginLeft: 10,
        width: '60%'
    },
    optionBtnText: {
        fontSize: 2*rem
    }
});

export { EditDetail }
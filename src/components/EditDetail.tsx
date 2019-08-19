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

import * as ImagePicker from 'expo-image-picker';
import { Pictogram } from '../models/pictogram';

import EditBottomModal from './EditBottomModal'

var picto
var bottomModalVisible = false;

interface IProps {
    visible: boolean,
    setVisibility: Function,
    picto: Pictogram
}

interface IState {
    visible: boolean,
    // picto: Pictogram
}

export default class EditDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            visible: false,
            // picto: new Pictogram()
        }
    }

    trial = (option) => {
        console.log('SELECCION MODAL:', option)
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        }
        if (option === 'gallery') {
            ImagePicker.launchImageLibraryAsync(options).then(
                result => {
                    if (result.cancelled === false) {
                        this.props.picto.img = { uri: result.uri }
                        console.log('NUEVO PICTO', picto)
                        this.setState({ visible: false })
                    }
                }
            )
        } else {
            ImagePicker.launchCameraAsync(options).then(
                result => {
                    if (result.cancelled === false) {
                        this.props.picto.img = { uri: result.uri }
                        console.log('NUEVO PICTO', picto)
                        this.setState({ visible: false })
                    }
                }
            )
        }

        
    }

    imageOptions = () => {
        this.setState({ visible: true })
        return

    }

    onCloseModal = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.props.visible}
                onRequestClose={() => {
                    console.log('Cerrando el modal')
                }}>
                <View style={{ margin: 20 }}>
                    <View style={{ backgroundColor: 'red', height: '100%', display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <View style={styles.mainBorder}>
                                <View style={styles.picto}>
                                    <Image source={this.props.picto.img} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                                </View>
                                <Text style={styles.pictoText} numberOfLines={1}>{this.props.picto.text}</Text>
                            </View>
                            <View style={{ backgroundColor: 'green', flex: 1, marginTop: 10 }}>

                            </View>
                        </View>
                        <View style={{ backgroundColor: 'yellow', flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                            <View style={{ backgroundColor: 'blue', width: '85%' }}>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.imageOptions()}>
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
                                    this.props.setVisibility(!this.props.visible);
                                }}>
                                <Text style={styles.pictoText}>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <EditBottomModal visible={this.state.visible} onClose={this.onCloseModal} optionSelected={this.trial}></EditBottomModal>
                </View>
            </Modal>
        )
    }

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
        fontSize: 2 * rem
    }
});

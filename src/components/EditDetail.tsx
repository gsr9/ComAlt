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
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import { Pictogram } from '../models/pictogram';

import EditBottomModal from './EditBottomModal'
import { TextInput } from 'react-native-gesture-handler';

var picto
var bottomModalVisible = false;

interface IProps {
    isBottomModalVisible: boolean,
    setVisibility: Function,
    picto: Pictogram
}

interface IState {
    isBottomModalVisible: boolean,
    isTextModalVisible: boolean,
    // picto: Pictogram,
    textOpt1: string,
    textOpt2: string,
    bottomModalFunc: Function,
    newText: string
}

export default class EditDetail extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props)
        this.state = {
            isBottomModalVisible: false,
            isTextModalVisible: false,
            textOpt1: '',
            textOpt2: '',
            bottomModalFunc: null,
            newText: ''
            // picto: new Pictogram()
        }
    }

    imageOption = (opt) => {
        const options = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        }
        if (opt === 'opt1') {
            ImagePicker.launchImageLibraryAsync(options).then(
                result => {
                    if (result.cancelled === false) {
                        this.props.picto.img = { uri: result.uri }
                        this.setState({ isBottomModalVisible: false })
                    }
                }
            )
        } else {
            ImagePicker.launchCameraAsync(options).then(
                result => {
                    if (result.cancelled === false) {
                        this.props.picto.img = { uri: result.uri }
                        this.setState({ isBottomModalVisible: false })
                    }
                }
            )
        }
    }

    audioOption = async (opt) => {
        console.log('La opción elegida para audio es ' + opt)
        const options = {
            type: 'audio/*'
        }
        if (opt === 'opt1') {
            DocumentPicker.getDocumentAsync(options).then(
                result => {
                    if (result.type === 'success') {
                        this.props.picto.sound = { uri: result.uri }
                        this.setState({ isBottomModalVisible: false })
                    }
                }
            )
        } else {
            const recording = new Audio.Recording();

            try {
                //recording.setOnRecordingStatusUpdate(props.recordingCallback);
                recording.setProgressUpdateInterval(200);

                //props.setState({ fileUrl: null });

                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                recording.setOnRecordingStatusUpdate((recStatus) => console.log(recStatus));

                //props.setState({ recording });
            } catch (error) {
                console.log(error) // eslint-disable-line
            }
            //  finally {
            //     console.log(recording)
            // }
        }

    }

    openBottomModal = (type) => {
        let textOpt1, textOpt2: string;
        let funct: Function;
        if (type === 'image') {
            textOpt1 = 'Seleccionar una imagen de la galería'
            textOpt2 = 'Tomar una foto con la cámara'
            funct = this.imageOption
        } else {
            textOpt1 = 'Seleccionar un archivo de audio de mis archivos'
            textOpt2 = 'Grabar un audio ahora'
            funct = this.audioOption
        }
        this.setState({
            isBottomModalVisible: true,
            textOpt1: textOpt1,
            textOpt2: textOpt2,
            bottomModalFunc: funct
        })
        return

    }

    closeBottomModal = () => { // toggle bottom modal ?
        this.setState({ isBottomModalVisible: !this.state.isBottomModalVisible })
    }

    toggleTextModal = () => {
        this.setState({ isTextModalVisible: !this.state.isTextModalVisible })
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={this.props.isBottomModalVisible}
                >
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
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('image')}>
                                    <Text style={styles.optionBtnText}> Cambiar imagen </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.toggleTextModal()}>
                                    <Text style={styles.optionBtnText}> Cambiar texto </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('audio')}>
                                    <Text style={styles.optionBtnText}> Cambiar sonido </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.optionButton}>
                                    <Text style={styles.optionBtnText}> Cambiar pictograma </Text>
                                </TouchableHighlight>
                            </View>
                            <TouchableHighlight
                                style={{ marginLeft: 'auto', marginRight: 10 }}
                                onPress={() => {
                                    this.props.setVisibility(!this.props.isBottomModalVisible);
                                }}>
                                <Text style={styles.pictoText}>Cerrar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <EditBottomModal
                        visible={this.state.isBottomModalVisible}
                        onClose={this.closeBottomModal}
                        optionSelected={this.state.bottomModalFunc}
                        textOpt1={this.state.textOpt1}
                        textOpt2={this.state.textOpt2}>
                    </EditBottomModal>
                    <Modal transparent={true} visible={this.state.isTextModalVisible}>
                        <View style={{ height: '100%', alignItems: 'center'}}>
                            <View style={{ height: '30%', width: '80%', marginTop: '10%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{padding:15}}>
                                    <Text style={{fontSize:24, marginBottom: 15}}>Introducir el nuevo texto</Text>
                                    <TextInput style={{fontSize:24, flex: 0.5, borderBottomColor: 'grey', borderBottomWidth:1}}
                                        autoFocus={true}
                                        onChangeText={ (newText) => this.setState({newText})}
                                        placeholder={this.props.picto.text}
                                        ></TextInput>
                                </View>
                                <View style={{flexDirection:'row', alignContent: 'space-between'}}>
                                    <Button onPress={this.toggleTextModal} title='Cancelar'></Button>
                                    <Button onPress={() => {this.props.picto.text = this.state.newText; this.toggleTextModal()}} title='Cambiar texto'></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
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

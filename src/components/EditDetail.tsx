import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    Button,
    Modal,
    Picker,
    Alert
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import { Pictogram } from '../models/pictogram';

import EditBottomModal from './EditBottomModal'
import { TextInput } from 'react-native-gesture-handler';

interface IProps {
    navigation: any,
    isBottomModalVisible: boolean,
    setVisibility: Function,
    picto: Pictogram,
    categories: any,
    allPictos: Pictogram[],
    leftPictos?: Pictogram[],
    rightPictos?: Pictogram[]
}

interface IState {
    isBottomModalVisible: boolean,
    isTextModalVisible: boolean,
    picto: Pictogram,
    textOpt1: string,
    textOpt2: string,
    bottomModalFunc: Function,
    newText: string,
    leftPictos: Pictogram[],
    rightPictos: Pictogram[]
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
            newText: '',
            picto: this.props.picto,
            leftPictos: this.props.leftPictos || [],
            rightPictos: this.props.rightPictos || []
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
                <View style={{ padding: 20, backgroundColor: 'azure' }}>
                    <View style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                        <View>
                            <View style={styles.mainBorder}>
                                <View style={styles.picto}>
                                    <Image source={this.props.picto.img} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                                </View>
                                <Text style={styles.pictoText} numberOfLines={1}>{this.props.picto.text}</Text>
                            </View>
                            <View style={{ flex: 1, marginTop: 10 }}>

                            </View>
                        </View>
                        <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                            <View style={{ width: '85%', marginLeft: 10, alignItems: 'center' }}>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('image')}>
                                    <Text style={styles.optionBtnText}> Cambiar imagen </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.toggleTextModal()}>
                                    <Text style={styles.optionBtnText}> Cambiar texto </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('audio')}>
                                    <Text style={styles.optionBtnText}> Cambiar sonido </Text>
                                </TouchableHighlight>
                                <View style={this.props.picto.category === undefined ?
                                    { display: 'none' } :
                                    { width: '100%', alignItems: 'center' }}>
                                    <TouchableHighlight style={[styles.optionButton, this.isFixedPicto()]}
                                        onPress={() => {
                                            this.props.setVisibility(false)
                                            this.props.navigation.navigate('EditReplace', {picto: this.props.picto})
                                        }}>
                                        <Text style={styles.optionBtnText}> Cambiar pictograma </Text>
                                    </TouchableHighlight>
                                    <View style={{ display: this.props.picto !== undefined ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <Text style={{ fontSize: 2 * rem, marginRight: '1%' }}>Categoría</Text>
                                        <Picker
                                            selectedValue={this.props.picto.category}
                                            mode='dialog'
                                            style={{ width: '39%' }}
                                            onValueChange={(itemValue) => {
                                                this.props.picto.category = itemValue;
                                                this.setState({ picto: this.props.picto })
                                            }
                                            }>
                                            {this.props.categories.map(element => {
                                                return <Picker.Item key={element.text} label={element.text} value={element.text} />
                                            })}
                                        </Picker>
                                    </View>
                                </View>
                                <TouchableHighlight style={[styles.optionButton, { backgroundColor: 'lightcoral' }]}
                                    onPress={() => this.deletePicto()}>
                                    <Text style={styles.optionBtnText}> Eliminar pictograma </Text>
                                </TouchableHighlight>
                            </View>
                            <TouchableHighlight
                                style={{ marginLeft: 'auto', marginRight: 10, height: 30 }}
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
                        <View style={{ height: '100%', alignItems: 'center' }}>
                            <View style={{ height: '30%', width: '80%', marginTop: '10%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ padding: 15 }}>
                                    <Text style={{ fontSize: 24, marginBottom: 15 }}>Introducir el nuevo texto</Text>
                                    <TextInput style={{ fontSize: 24, flex: 0.5, borderBottomColor: 'grey', borderBottomWidth: 1 }}
                                        autoFocus={true}
                                        onChangeText={(newText) => this.setState({ newText })}
                                        placeholder={this.props.picto.text}
                                    ></TextInput>
                                </View>
                                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                                    <Button onPress={this.toggleTextModal} title='Cancelar'></Button>
                                    <Button onPress={() => this.changeText()} title='Cambiar texto'></Button>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </Modal>
        )
    }
    isFixedPicto(): import("react-native").StyleProp<import("react-native").ViewStyle> {
        let fixedPictos = this.state.leftPictos.concat(this.state.rightPictos)
        let picto = fixedPictos.find(item => {
            if (this.props.picto.text === item.text && this.props.picto.img === item.img && this.props.picto.sound === item.sound) {
                return true
            }
            return false
        })
        if (picto !== undefined) {
            return { display: 'flex' }
        }
        return { display: 'none' }
    }
    changeText = () => {
        if (this.state.newText.length < 4) {
            alert('El texto tiene que contener más de tres caracteres')
            return
        }
        if (this.props.picto.category === undefined) {
            this.props.allPictos.map(item => {
                if (item.category === this.props.picto.text) {
                    item.category = this.state.newText
                }
            })
        }
        this.props.picto.text = this.state.newText
        this.toggleTextModal()
    }
    deletePicto = () => {
        let index = this.props.allPictos.findIndex(value => value.text === this.props.picto.text)
        // Confirmar que se quiere eliminar el pictograma
        if (this.props.picto.category === undefined) {
            this.deleteCategory()
            return
        }
        Alert.alert(
            'Eliminar pictograma',
            '¿Está seguro/a de querer eliminar este pictograma?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar pictograma', onPress: () => {
                        this.props.allPictos.splice(index, 1)
                        this.props.setVisibility(!this.props.isBottomModalVisible);
                    }
                },
            ]
        );
    }

    deleteCategory = () => {
        let children = this.props.allPictos.filter(item => item.category === this.props.picto.text)
        let index = this.props.categories.findIndex(value => value.text === this.props.picto.text)
        if (children.length > 0) {
            Alert.alert(
                'Eliminar categoría',
                '¿Está seguro/a de querer eliminar esta categoría y todos los pictogramas asociados?',
                [
                    { text: 'Cancelar', style: 'cancel' },
                    {
                        text: 'Eliminar pictograma', onPress: () => {
                            this.props.categories.splice(index, 1)
                            this.props.setVisibility(!this.props.isBottomModalVisible);
                        }
                    },
                ]
            );
        } else {

        }
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
        width: '60%'
    },
    optionBtnText: {
        fontSize: 2 * rem,
        textAlign: 'center'
    }
});

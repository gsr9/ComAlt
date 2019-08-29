import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button,
  Text,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  Modal,
  TextInput,
  Picker,
  Alert
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av';

import { initialize, addPressPicto, clearTopBarText, removeLastPicto } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pictogram } from '../models/pictogram'

import EditBottomModal from '../components/EditBottomModal'

interface IState {
  newPicto: Pictogram,
  isBottomModalVisible: boolean,
  isTextModalVisible: boolean,
  textOpt1: string,
  textOpt2: string,
  bottomModalFunc: Function,
  newText: string,
  type: string
}
interface IProps {
  navigation: any,
  pictos: any,
  addPressPicto: Function,
  clearTopBarText: Function,
  removeLastPicto: Function
}


class EditionAddScreen extends React.Component<IProps, IState> {


  static navigationOptions: { header: any, gesturesEnabled: boolean };

  constructor(props: any) {
    super(props);
    this.state = {
      isBottomModalVisible: false,
      isTextModalVisible: false,
      textOpt1: '',
      textOpt2: '',
      bottomModalFunc: null,
      newText: '',
      newPicto: new Pictogram(),
      type: 'picto'
    }
  }

  shortAsync = (time) => {
    return new Promise(resolve => setTimeout(() => {
      resolve();
    }, time));
  }

  imageOption = (opt) => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    }
    if (opt === 'opt1') {
      ImagePicker.launchImageLibraryAsync(options).then(
        result => {
          if (result.cancelled === false) {
            this.state.newPicto.img = { uri: result.uri }
            this.setState({ isBottomModalVisible: false })
          }
        }
      )
    } else {
      ImagePicker.launchCameraAsync(options).then(
        result => {
          if (result.cancelled === false) {
            this.state.newPicto.img = { uri: result.uri }
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
            this.state.newPicto.sound = { uri: result.uri }
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
      <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
        {/* Header */}
        <View style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
          {/* Top bar */}
          <View style={{ backgroundColor: 'white', height: '80%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 2.5 * rem, color: 'darkblue', fontWeight: 'bold' }}>Añadiendo {this.state.type === 'picto' ? 'pictograma':'categoría'}</Text>
            <TouchableHighlight style={{ marginLeft: 'auto' }}
              onPress={() => this.addNewPicto()}>
              <View style={{
                alignItems: 'center', backgroundColor: 'green', marginRight: 10,
                justifyContent: 'center', borderRadius: 15, height: 3 * rem
              }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 1.5 * rem }}> Guardar {this.state.type === 'picto' ? 'pictograma':'categoría'} </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{ marginRight: 10 }} onPress={() => this.props.navigation.goBack()}>
              <View style={{
                borderColor: 'red', borderWidth: 2, alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
              }}
              >
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 1.5 * rem }}>Cancelar</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {/* Body */}
        <View style={{ display: 'flex', flexDirection: 'row', height: '85%', marginLeft: 10 }}>
          <View style={{ flex: 0.3 }}>
            <Image source={null || this.state.newPicto.img} style={styles.picto} />
            <Text style={styles.pictoText}>{this.state.newPicto.text || ''}</Text>
          </View>
          <View style={{ flex: 0.7, marginTop: 15 }}>
            <View style={{ marginBottom: 5, flexDirection: 'row', width: '60%', justifyContent: 'center' }}>
              <TouchableHighlight style={[{ borderBottomStartRadius: 10, borderTopStartRadius: 10, padding: 5 },
              this.state.type === 'picto' ? { backgroundColor: 'darkgreen' } : { borderWidth: 1, borderColor: 'darkgreen' }]}
                onPress={() => this.setState({ type: 'picto' })}>
                <Text style={[styles.optionBtnText,
                this.state.type === 'picto' ? { color: 'white' } : { color: 'black' },]}>
                  Pictograma
                </Text>
              </TouchableHighlight>
              <TouchableHighlight style={[{ borderBottomEndRadius: 10, borderTopEndRadius: 10, padding: 5 },
              this.state.type === 'category' ? { backgroundColor: 'darkgreen' } : { borderWidth: 1, borderColor: 'darkgreen' }]}
                onPress={() => this.setState({ type: 'category' })}>
                <Text style={[styles.optionBtnText,
                this.state.type === 'category' ? { color: 'white' } : { color: 'black' }]}>
                  Categoría
                </Text>
              </TouchableHighlight>
            </View>
            <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('image')}>
              <Text style={styles.optionBtnText}> Seleccionar imagen </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.optionButton} onPress={() => this.toggleTextModal()}>
              <Text style={styles.optionBtnText}> Escribir texto </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.optionButton} onPress={() => this.openBottomModal('audio')}>
              <Text style={styles.optionBtnText}> Seleccionar sonido </Text>
            </TouchableHighlight>
            <View style={{ display: this.state.type === 'picto' ? 'flex' : 'none', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 2 * rem, marginRight: '1%' }}>Categoría</Text>
              <Picker
                selectedValue={this.state.newPicto.category}
                mode='dialog'
                style={{ width: '39%' }}
                onValueChange={(itemValue) => {
                  this.state.newPicto.category = itemValue
                  this.setState({ newPicto: this.state.newPicto })
                }
                }>
                {this.props.pictos.categories.map(element => {
                  return <Picker.Item key={element.text} label={element.text} value={element.text} />
                })}
              </Picker>
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
                    placeholder='Texto del pictograma'
                  ></TextInput>
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                  <Button onPress={this.toggleTextModal} title='Cancelar'></Button>
                  <Button onPress={() => { this.state.newPicto.text = this.state.newText; this.toggleTextModal() }} title='Cambiar texto'></Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View >
    );
  }
  addNewPicto = () => {
    let msg = ''
    if (this.state.type === 'picto') {
      this.state.newPicto.timesUsed = 0;
      this.props.pictos.pictos.push(this.state.newPicto)
      msg = 'Pictograma añadido correctamente'
    } else{
      this.props.pictos.categories.push(
        {
          text: this.state.newPicto.text,
          img: this.state.newPicto.img,
          sound: this.state.newPicto.sound
        })
        msg = 'Categoría añadida correctamente'
    }
    Alert.alert(
      'Acción completada',
      msg,
      [
        {text: 'Seguir editando', onPress: () => this.props.navigation.navigate('EditionMain', this.props)},
        {text: 'Ir al modo usuario', onPress: () => this.props.navigation.navigate('Home')},
      ],
      {cancelable: false}
    );
  }
  closeEditMode = async () => {
    try {
      await AsyncStorage.setItem('state', JSON.stringify(this.state));
    } catch (error) {
      // Error saving data
      console.log('ERROR SAVING STATE')
    }

    this.props.navigation.navigate('SelectMode')
  }
}


EditionAddScreen.navigationOptions = {
  header: null,
  gesturesEnabled: false
};
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
    width: deviceWidth / 5.4,// (Dimensions.get('window').scale + 3.3),
    height: (deviceHeight / 3.6) * heightCoef,
    backgroundColor: 'white'
  },
  actionBtns: {
    height: deviceHeight / 12,
    width: deviceHeight / 12
  },
  mainBorder: {
    borderColor: 'black',
    borderWidth: 3,
    margin: 1,
    paddingRight: 1
  },
  pictoText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    backgroundColor: 'white',
    width: deviceWidth / 5.4
  },
  centerPicto: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  optionButton: {
    backgroundColor: 'lightblue',
    borderRadius: 15,
    padding: 5,
    marginTop: 40,
    width: '60%'
  },
  optionBtnText: {
    fontSize: 2 * rem
  }
});

const mapStateToProps = (state) => {
  const { pictos } = state
  return { pictos }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    initialize,
    addPressPicto,
    clearTopBarText,
    removeLastPicto
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EditionAddScreen);
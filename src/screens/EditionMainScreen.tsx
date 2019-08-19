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

import { Audio } from 'expo-av';

import { initialize, addPressPicto, clearTopBarText, removeLastPicto } from './../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pictogram } from '../models/pictogram'
import EditDetail from '../components/EditDetail';


interface IState {
  pictos: Pictogram[],
  leftPictos: Pictogram[],
  rightPictos: Pictogram[],
  categories: Pictogram[],
  topBarText: Pictogram[],
  mostUsed: Pictogram[],
  modalVisible: boolean,
  selectedPicto: Pictogram
}
interface IProps {
  navigation: any,
  pictos: any,
  addPressPicto: Function,
  clearTopBarText: Function,
  removeLastPicto: Function
}


class EditionMainScreen extends React.Component<IProps, IState> {


  static navigationOptions: { header: any, gesturesEnabled: boolean };

  constructor(props: any) {
    super(props);
    this.props.pictos.modalVisible = false;
    this.props.pictos.selectedPicto = new Pictogram();
    this.state = this.props.pictos;

  }

  addItem = () => {
    console.log('Añadiendo item')
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  editItem = async (picto) => {

    if (picto.text === 'Categorías') {
      this.props.navigation.navigate('Categories', this.state)
      return
    }
    this.setState({ selectedPicto: picto })

    console.log(this.state.selectedPicto)

    this.setModalVisible(true);
    console.log('Editando el picto ' + picto.text)
  }


  shortAsync = (time) => {
    return new Promise(resolve => setTimeout(() => {
      resolve();
    }, time));
  }

  loadPictos = (arrayPictos) => {
    let array = []
    arrayPictos.forEach((item) => {
      array.push(
        <TouchableHighlight key={item.text} onPress={() => this.editItem(item)} style={styles.mainBorder} underlayColor="rgba(200,200,200,0.5)">
          <View>
            <View style={styles.picto}>
              <Image source={item.img} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
            </View>
            <Text style={styles.pictoText} numberOfLines={1}>{item.text}</Text>
          </View>
        </TouchableHighlight >
      );
    })
    return array;
  }

  mostUsedPictos = () => {

    let array = this.state.pictos.sort((a, b) => Math.round((b.timesUsed - a.timesUsed) / a.timesUsed))
    array = array.slice(0, 9)
    return array;
  }

  render() {
    return (
      <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
        {/* Header */}
        <View style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
          {/* Top bar */}
          <View style={{ backgroundColor: 'white', height: '80%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 2.5 * rem, color: 'darkblue', fontWeight: 'bold' }}>Modo Edición</Text>
            <TouchableHighlight style={{ marginLeft: 'auto', marginRight: 10 }} onPress={() => console.log('Añadiendo item')}>
              <View style={{
                backgroundColor: 'green', alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
              }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 1.5 * rem }}>Añadir</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{ marginRight: 10 }} onPress={() => this.props.navigation.navigate('SelectMode')}>
              <View style={{
                borderColor: 'red', borderWidth: 2, alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
              }}
              >
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 1.5 * rem }}>Salir</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {/* Body */}
        <View style={{ display: 'flex', flexDirection: 'row', height: '85%' }}>
          {/* Main left Picto options */}
          <View style={[styles.container]}>
            {this.loadPictos(this.state.leftPictos)}
          </View>
          {/* Main Picto actions */}
          <View style={[styles.centerPicto]}>
            {this.loadPictos(this.mostUsedPictos())}
          </View>
          {/* Main right Picto options */}
          <View style={[styles.container]}>
            {this.loadPictos(this.state.rightPictos)}
          </View>
          <EditDetail visible={this.state.modalVisible} setVisibility={this.setModalVisible} picto={this.state.selectedPicto}></EditDetail>
        </View>
      </View>
    );
  }
}


EditionMainScreen.navigationOptions = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditionMainScreen);
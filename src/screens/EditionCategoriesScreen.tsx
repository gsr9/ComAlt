import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { Audio } from 'expo-av';

import { initialize, addPressPicto, clearTopBarText, removeLastPicto } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pictogram } from '../models/pictogram'
import EditDetail from '../components/EditDetail';
import rightCategory from '../../assets/rightCategory'


interface IState {
  pictos: Pictogram[],
  categories: Pictogram[],
  shownCategories: any[],
  modalVisible: boolean,
  selectedCategory: any
}
interface IProps {
  navigation: any,
  pictos: any,
  addPressPicto: Function,
  clearTopBarText: Function,
  removeLastPicto: Function
}


class EditionCategoriesScreen extends React.Component<IProps, IState> {


  static navigationOptions: { header: any, gesturesEnabled: boolean };

  page = 1;


  constructor(props: any) {
    super(props);
    this.props.pictos.modalVisible = false;
    this.props.pictos.selectedPicto = new Pictogram();
    this.state = {
      categories: this.props.pictos.categories,
      pictos: this.props.pictos.pictos,
      shownCategories: this.props.pictos.categories.slice(0 + (this.page - 1), 12 * this.page),
      modalVisible: false,
      selectedCategory: new Pictogram()
    }


  }

  activatePicto = async (picto) => {

    if (picto.text === 'Volver') {
      this.props.navigation.goBack()
      return
    }
    if (picto.text === 'Siguiente') {
      if (this.page < this.props.pictos.categories.length / 12) {
        this.page++;
        this.setState({ shownCategories: this.props.pictos.categories.slice(12 * (this.page - 1), 12 * this.page) });
      }
      return
    }
    if (picto.text === 'Anterior') {
      if (this.page > 1) {
        this.page--;
        this.setState({ shownCategories: this.props.pictos.categories.slice(12 * (this.page - 1), 12 * this.page) });
      }
      return
    }
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(picto.sound);
      await soundObject.playAsync();
      // Your sound is playing!

    } catch (error) {
      // An error occurred!
      console.log("Error al reproducir")
    } finally {
      this.props.navigation.navigate('EditCategory', { category: picto.text })
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  editCategory = async (category) => {

    if (category.text === 'Volver') {
      this.props.navigation.goBack()
      return
    }
    this.setState({ selectedCategory: category })

    this.setModalVisible(true);
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
        <TouchableHighlight key={item.text} onLongPress={() => this.editCategory(item)}
          onPress={() => this.activatePicto(item)} style={styles.mainBorder} underlayColor="rgba(200,200,200,0.5)">
          <View style={{backgroundColor: 'white'}}>
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


  render() {
    return (
      <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
        {/* Header */}
        <View style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
          {/* Top bar */}
          <View style={{ backgroundColor: 'white', height: '80%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
            <Text style={{ marginLeft: 15, fontSize: 2.5 * rem, color: 'darkblue', fontWeight: 'bold' }}>Modo Edición</Text>
            {/* <TouchableHighlight style={{ marginLeft: 'auto', marginRight: 10 }} onPress={() => this.props.navigation.navigate('AddScreen', { additionType: 'category' })}>
              <View style={{
                backgroundColor: 'green', alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
              }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 1.5 * rem }}>Añadir</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight style={{ marginRight: 10 }} onPress={() => this.closeEditMode()}>
              <View style={{
                borderColor: 'red', borderWidth: 2, alignItems: 'center',
                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
              }}
              >
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 1.5 * rem }}>Salir</Text>
              </View>
            </TouchableHighlight> */}
          </View>
        </View>
        {/* Body */}
        <View style={{ display: 'flex', flexDirection: 'row', height: '85%' }}>
          {/* Main Categories options */}
          <View style={[styles.centerPicto]}>
            {this.loadPictos(this.state.shownCategories)}
          </View>
          {/* Right Categories options */}
          <View style={[styles.container]}>
            {this.loadPictos(rightCategory)}
          </View>
          <EditDetail
            isBottomModalVisible={this.state.modalVisible}
            setVisibility={this.setModalVisible}
            picto={this.state.selectedCategory}
            categories={this.state.categories}
            allPictos={this.state.pictos}
          ></EditDetail>
        </View>
      </View>
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


EditionCategoriesScreen.navigationOptions = {
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
    // paddingRight: 1,
    maxHeight: '33%'
  },
  pictoText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    backgroundColor: 'white',
    width: deviceWidth / 5.45
  },
  centerPicto: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    marginLeft: 10
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

export default connect(mapStateToProps, mapDispatchToProps)(EditionCategoriesScreen);
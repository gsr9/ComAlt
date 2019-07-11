import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import { Audio } from 'expo-av';

import { clearTopBarText, removeLastPicto } from '../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pictogram } from '../models/pictogram'

interface IState {
  categories: Pictogram[],
  topBarText: Pictogram[]
}
interface IProps {
  navigation: any,
  pictos: any,
  addPressPicto: Function,
  clearTopBarText: Function,
  removeLastPicto: Function
}

class CategoriesScreen extends React.Component<IProps, IState> {

  static navigationOptions: { header: any; };

  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.pictos.categories,
      topBarText: this.props.pictos.topBarText
    }
  }

  activatePicto = async (picto) => {

    if (picto.text === 'Volver') {
      this.props.navigation.navigate('Home')
      return
    }
    const soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(picto.sound);
      await soundObject.playAsync();
      // Your sound is playing!
      this.props.navigation.navigate('SelectedCategory', { category: picto.text, state: this.state })

    } catch (error) {
      // An error occurred!
      console.log("Error al reproducir")
    }
  }

  deleteWord = () => {
    this.props.removeLastPicto();
    this.setState(this.props.pictos)
  }

  deleteAll = () => {
    this.props.clearTopBarText();
    this.setState(this.props.pictos)
  }

  getTextFromArray = () => {
    let texto = ""

    let topBarText = this.state.topBarText;
    if (topBarText.length !== 0) {
      texto = topBarText.map((item: any) => item.text).reduce((previous, current) => previous + " " + current.toLowerCase())
    }
    return texto;
  }

  playWholePhrase = async () => {
    for (const picto of this.state.topBarText) {
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(picto.sound);
        await soundObject.getStatusAsync().then(async (sound) => {
          if (sound.isLoaded) {
            await soundObject.playAsync();
            await this.shortAsync(sound.playableDurationMillis / 1.75)
          }
        })
      } catch (error) {
        // An error occurred!
        console.log("Error al reproducir")
      }
    }
  }

  shortAsync = (time) => {
    return new Promise(resolve => setTimeout(() => {
      resolve();
    }, time));
  }


  render() {
    return (
      <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
        {/* Header */}
        <View style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
          {/* Top bar */}
          <View style={{ backgroundColor: 'white', height: '60%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
            <TouchableHighlight onPress={() => this.playWholePhrase()}>
              <View>
                <Image source={require('../../assets/images/green_play.png')} style={styles.actionBtns} />
              </View>
            </TouchableHighlight>
            <ScrollView horizontal={true} bounces={false}>
              <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 2 * rem }}>
                  {this.getTextFromArray()}
                </Text>
              </View>
            </ScrollView>
            <TouchableHighlight onPress={this.deleteWord} style={{ marginLeft: 'auto', marginRight: 10 }} >
              <View>
                <Image source={require('../../assets/images/orange_backspace.png')} style={styles.actionBtns} />
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.deleteAll} style={{ marginRight: 2 }} >
              <View>
                <Image source={require('../../assets/images/red_bin.png')} style={styles.actionBtns} />
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {/* Body */}
        <View style={{ display: 'flex', flexDirection: 'row', height: '85%' }}>
          {/* Main left Picto options */}
          <View style={[styles.container]}>
            {loadPictos(this.state.categories.slice(0, 3))}
          </View>
          {/* Main Picto actions */}
          <View style={[styles.centerPicto]}>
            {loadPictos(this.state.categories.slice(3, 12))}
          </View>
          {/* Main right Picto options */}
          <View style={[styles.container]}>
            {loadPictos(this.state.categories.slice(12, 15))}
          </View>
        </View>
      </View>
    );
  }
}



function shortAsync(time) {
  return new Promise(resolve => setTimeout(() => {
    resolve();
  }, time - 150));
}

function loadPictos(arrayPictos) {
  let array = []
  arrayPictos.forEach((item) => {
    array.push(
      <TouchableHighlight key={item.text} onPress={() => this.activatePicto(item)} style={styles.mainBorder} underlayColor="rgba(200,200,200,0.5)">
        <View>
          <Image source={item.img} style={styles.picto} />
          <Text style={styles.pictoText} >{item.text}</Text>
        </View>
      </TouchableHighlight>
    );
  })
  return array;
}


CategoriesScreen.navigationOptions = {
  header: null
};
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const rem = deviceWidth / 64;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  picto: {
    width: deviceWidth / (Dimensions.get('window').scale + 3.3),
    height: deviceHeight / (Dimensions.get('window').scale + 2.3),
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
    backgroundColor: 'white'
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
    clearTopBarText,
    removeLastPicto
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);
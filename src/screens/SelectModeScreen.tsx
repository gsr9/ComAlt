import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    Alert,
    AsyncStorage
} from 'react-native';

import { Pictogram } from '../models/pictogram'

import * as Permissions from 'expo-permissions';
import { resetApp } from './../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface IState {
    pictos: Pictogram[],
    leftPictos: Pictogram[],
    rightPictos: Pictogram[],
    categories: Pictogram[],
    topBarText: Pictogram[],
    mostUsed: Pictogram[]
}
interface IProps {
    navigation: any,
    pictos: any,
    resetApp: Function
}


class SelectModeScreen extends React.Component<IProps, IState> {

    static navigationOptions: { header: any, gesturesEnabled: boolean };

    constructor(props: any) {
        super(props);
        this.state = this.props.pictos;
        this.requestPermissions()
    }

    requestPermissions = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA,
            Permissions.AUDIO_RECORDING);
    }

    render() {
        return (
            <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
                {/* Header */}
                <View style={{ height: '15%', display: 'flex', justifyContent: 'center', backgroundColor: '#91bfdd' }}>
                    {/* Top bar */}
                    <View style={{ height: '80%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 15, fontSize: 2.5 * rem, color: 'white', fontWeight: 'bold' }} numberOfLines={1}>{'Selección de modo'}</Text>
                        <TouchableHighlight style={{ marginLeft: 'auto', marginRight: 10 }} onPress={() => this.resetApp()}>
                            <View style={{
                                backgroundColor: 'darkgrey',borderColor: 'grey', borderWidth: 2, alignItems: 'center',
                                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 11 * rem
                            }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 1.5 * rem }}>Reestablecer</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                {/* Body */}
                <View style={{ display: 'flex', flexDirection: 'row', height: '85%', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TouchableHighlight key={'User'} onPress={() => this.props.navigation.navigate('Home')} style={styles.mainBorder} underlayColor="rgba(200,200,200,0.5)">
                        <View>
                            <View style={styles.picto}>
                                <Image source={require('../../assets/images/yo.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                            <Text style={styles.pictoText} numberOfLines={1}>{'Modo Usuario'}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight key={'Edit'} onPress={() => this.props.navigation.navigate('EditionMain')} style={styles.mainBorder} underlayColor="rgba(200,200,200,0.5)">
                        <View>
                            <View style={styles.picto}>
                                <Image source={require('../../assets/images/lapiz_y_papel.png')} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                            </View>
                            <Text style={styles.pictoText} numberOfLines={1}>{'Modo Edición'}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    resetApp = () => {
        Alert.alert(
            'Reestablecer aplicación',
            '¿Está seguro/a de reestablecer la aplicación? Se eliminarán todos los contenidos creados por usted.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Reestablecer la aplicación', onPress: () => {
                        // AsyncStorage.clear()
                        this.props.resetApp()
                    }
                },
            ]
        )
    }
}


SelectModeScreen.navigationOptions = {
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
        width: deviceHeight / 2,// (Dimensions.get('window').scale + 3.3),
        height: deviceHeight / 2,
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
        fontSize: 2 * rem,
        backgroundColor: 'white',
        width: deviceHeight / 2
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
      resetApp
    }, dispatch)
  );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SelectModeScreen);
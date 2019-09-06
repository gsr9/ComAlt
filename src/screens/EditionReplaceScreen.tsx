import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    AsyncStorage,
    Alert
} from 'react-native';


import { initialize, addPressPicto, clearTopBarText, removeLastPicto } from './../actions/index'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pictogram } from '../models/pictogram'

interface IState {
    pictos: Pictogram[],
    leftPictos: Pictogram[],
    rightPictos: Pictogram[],
    categories: Pictogram[],
    topBarText: Pictogram[],
    mostUsed: Pictogram[],
    selectedPicto: Pictogram
}
interface IProps {
    navigation: any,
    pictos: any,
    addPressPicto: Function,
    clearTopBarText: Function,
    removeLastPicto: Function
}


class EditionReplaceScreen extends React.Component<IProps, IState> {


    static navigationOptions: { header: any, gesturesEnabled: boolean };
    pictoToChange: Pictogram

    constructor(props: any) {
        super(props);
        this.pictoToChange = this.props.navigation.state.params.picto
        this.props.pictos.modalVisible = false;
        this.props.pictos.selectedPicto = new Pictogram();
        this.state = this.props.pictos

    }

    selectItem = async (picto) => {
        this.setState({ selectedPicto: picto })
    }


    loadPictos = (arrayPictos: Pictogram[]) => {
        let array = []
        arrayPictos.forEach((item) => {
            array.push(
                <TouchableHighlight key={item.text} onPress={() => this.selectItem(item)}
                    style={[styles.mainBorder, item.text === this.state.selectedPicto.text ? { borderColor: 'green', borderWidth: 5 } : {}]} underlayColor="rgba(200,200,200,0.5)"
                >
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

    confirm = () => {
        Alert.alert(
            'Confirmar cambio de pictograma',
            '¿Está seguro de que desea cambiar el pictograma fijo de \'' + this.pictoToChange.text 
            + '\' por la opción seleccionada \'' + this.state.selectedPicto.text + '\' ?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Sustituir el pictograma', onPress: () => this.replacePicto() },
            ]
        )
        
    }

    replacePicto() {
        let left = this.state.leftPictos.findIndex(item => item.text === this.pictoToChange.text)
        let right = this.state.rightPictos.findIndex(item => item.text === this.pictoToChange.text)
        let cosa = this.state.rightPictos.indexOf(this.pictoToChange)

        if (left > -1) {
            this.state.leftPictos[left] = this.state.selectedPicto
        } else if (right > -1) {
            this.state.rightPictos[right] = this.state.selectedPicto
        }
        this.props.navigation.navigate('EditionMain', this.state)
    }

    render() {
        return (
            <View style={{ display: 'flex', backgroundColor: '#CBE1EF' }}>
                {/* Header */}
                <View style={{ height: '15%', display: 'flex', justifyContent: 'center' }}>
                    {/* Top bar */}
                    <View style={{ backgroundColor: 'white', height: '80%', display: 'flex', flexDirection: 'row', paddingStart: 2, alignItems: 'center' }}>
                        <Text style={{ marginLeft: 15, fontSize: 2.5 * rem, color: 'darkblue', fontWeight: 'bold' }}>Reemplazando pictograma</Text>
                        <TouchableHighlight style={{ marginLeft: 'auto', marginRight: 10 }} onPress={() => this.confirm()}>
                            <View style={{
                                backgroundColor: 'green', alignItems: 'center',
                                justifyContent: 'center', borderRadius: 15, height: 3 * rem, width: 9 * rem
                            }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 1.5 * rem }}>Confirmar</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={{ marginRight: 10 }} onPress={() => this.props.navigation.goBack()}>
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
                    <ScrollView>
                        <View style={[styles.centerPicto]}>
                            {this.loadPictos(this.state.pictos)}
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

EditionReplaceScreen.navigationOptions = {
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
    fixedPicto: {
        borderColor: 'forestgreen'
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

export default connect(mapStateToProps, mapDispatchToProps)(EditionReplaceScreen);
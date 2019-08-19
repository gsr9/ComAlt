import React from 'react';
import {
    Button,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    Modal
} from 'react-native';

import { Pictogram } from '../models/pictogram'

interface IProps {
    visible: boolean,
    onClose: Function,
    optionSelected: Function
}

interface IState {
    visible: boolean
}


export default class EditBottomModal extends React.Component<IProps, IState> {

    static navigationOptions: { header: any, gesturesEnabled: boolean };

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.visible} transparent={true}>
                <View style={{ height: '100%', justifyContent: 'flex-end' }}>
                    <View style={{ height: '30%', backgroundColor: 'lightblue' }}>
                        <Button onPress={() => this.props.optionSelected('gallery')} title='Elegir foto de la galería'></Button>
                        <Button onPress={() => this.props.optionSelected('camera')} title='Tomar una nueva foto'></Button>
                        <Button onPress={() => this.props.onClose()} title='Cerrar modal'></Button>
                    </View>
                </View>
            </Modal>
        )
    }
}  
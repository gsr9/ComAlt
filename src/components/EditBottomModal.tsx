import React from 'react';
import {
    Button,
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import { Pictogram } from '../models/pictogram'

interface IProps {
    visible: boolean,
    onClose: Function,
    optionSelected: Function,
    textOpt1: string,
    textOpt2: string
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
                <TouchableOpacity
                    style={{flex:1}}
                    activeOpacity={1}
                    onPressOut={() => { this.props.onClose() }}
                >
                    <View style={{ height: '100%', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
                        <TouchableWithoutFeedback>
                            <View style={{ height: '30%', backgroundColor: 'lightblue', paddingTop: '2%', paddingBottom: '5%', justifyContent: 'space-evenly' }}>
                                <Button onPress={() => this.props.optionSelected('opt1')} title={this.props.textOpt1}></Button>
                                <View style={this.props.textOpt2.includes('audio') ? {display: 'none'} : {display: 'flex'}}>
                                <Button onPress={() => this.props.optionSelected('opt2')} title={this.props.textOpt2}></Button>
                                </View>
                                <Button onPress={() => this.props.onClose()} title='Cerrar modal'></Button>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }
}  
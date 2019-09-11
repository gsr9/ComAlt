import { combineReducers } from 'redux';

import { AsyncStorage } from 'react-native'

import leftPictos from '../../assets/leftOptions'
import rightPictos from '../../assets/rightOptions'
import pictograms from '../../assets/allPictograms'
import categories from '../../assets/categories'

let initialState = {
    pictos: pictograms,
    leftPictos: leftPictos,
    rightPictos: rightPictos,
    categories: categories,
    topBarText: [],
    error: false
}

const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('state');
        if (value !== null) {
            // Our data is fetched successfully
            const result = JSON.parse(value);
            return result
        }
    } catch (error) {
        // Error retrieving data
        console.log('ERROR RETRIEVING STORED DATA')
    }
}

retrieveData().then(storedData => {
    if (storedData !== undefined) {
        initialState.pictos = storedData.pictos
        initialState.leftPictos = storedData.leftPictos
        initialState.rightPictos = storedData.rightPictos
        initialState.categories = storedData.categories
    }
})

const dataReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'INITIALIZING':
            return {
                ...state,
                pictos: action.data,
            }
        case 'ADD_WORD':
            state.topBarText.push(action.picto);
            return state;
        case 'CLEAR_TEXT':
            state.topBarText = []
            return state;
        case 'REMOVE_LAST':
            state.topBarText.splice(state.topBarText.length - 1, 1)
            return state;
        case 'RESET':
            let resetedState = {
                pictos: pictograms,
                leftPictos: leftPictos,
                rightPictos: rightPictos,
                categories: categories,
                topBarText: [],
                error: false
            }
            AsyncStorage.setItem('state', JSON.stringify(resetedState))
            return resetedState;
        default:
            return state
    }
}

export default combineReducers({
    pictos: dataReducer,
});
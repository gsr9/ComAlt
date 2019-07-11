import { combineReducers } from 'redux';

import leftPictos from '../../assets/leftOptions'
import rightPictos from '../../assets/rightOptions'
import pictograms from '../../assets/allPictograms'
import categories from '../../assets/categories'

const initialState = {
    pictos: pictograms,
    leftPictos: leftPictos,
    rightPictos: rightPictos,
    categories: categories,
    topBarText: [],
    error: false
}


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
        default:
            return state
    }
}

export default combineReducers({
    pictos: dataReducer,
});